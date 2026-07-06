#!/usr/bin/env node

process.env.NODE_PATH = process.cwd();
require('module')._initPaths();

const fs = require('fs');
const path = require('path');
const db = require('shared/database');

const ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

function parseCsv(fileName) {
  const filePath = path.join(ROOT, fileName);
  const csv = fs.readFileSync(filePath, 'utf8').trim();
  const [headerLine, ...lines] = csv.split(/\r?\n/);
  const headers = headerLine.split(',');

  return lines.map((line) => {
    const values = line.split(',');
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}

function validateUuid(value, label) {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidPattern.test(value)) {
    throw new Error(`Invalid UUID for ${label}: ${value}`);
  }
}

function validateDatasets(users, transactions, savings) {
  const userIds = new Set(users.map((user) => user.id));

  users.forEach((user) => validateUuid(user.id, `users.id (${user.name})`));
  transactions.forEach((transaction) => {
    validateUuid(transaction.id, `transactions.id (${transaction.id})`);
    validateUuid(transaction.user_id, `transactions.user_id (${transaction.id})`);
    if (!userIds.has(transaction.user_id)) {
      throw new Error(`Transaction ${transaction.id} references missing user ${transaction.user_id}`);
    }
  });
  savings.forEach((record) => {
    validateUuid(record.id, `savings_history.id (${record.id})`);
    validateUuid(record.user_id, `savings_history.user_id (${record.id})`);
    if (!userIds.has(record.user_id)) {
      throw new Error(`Savings record ${record.id} references missing user ${record.user_id}`);
    }
  });
}

async function upsertUsers(client, users) {
  for (const user of users) {
    await client.query(
      `
        INSERT INTO users
          (id, name, phone, occupation, employer_name, monthly_income, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          phone = EXCLUDED.phone,
          occupation = EXCLUDED.occupation,
          employer_name = EXCLUDED.employer_name,
          monthly_income = EXCLUDED.monthly_income,
          updated_at = CURRENT_TIMESTAMP
      `,
      [
        user.id,
        user.name,
        user.phone,
        user.occupation || null,
        user.employer_name || null,
        Number(user.monthly_income || 0),
        user.created_at,
      ]
    );
  }
}

async function upsertTransactions(client, transactions) {
  for (const transaction of transactions) {
    await client.query(
      `
        INSERT INTO transactions
          (id, user_id, amount, type, status, category, description, timestamp)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO UPDATE SET
          user_id = EXCLUDED.user_id,
          amount = EXCLUDED.amount,
          type = EXCLUDED.type,
          status = EXCLUDED.status,
          category = EXCLUDED.category,
          description = EXCLUDED.description,
          timestamp = EXCLUDED.timestamp
      `,
      [
        transaction.id,
        transaction.user_id,
        Number(transaction.amount || 0),
        transaction.type,
        transaction.status,
        transaction.category,
        transaction.description || null,
        transaction.timestamp,
      ]
    );
  }
}

async function upsertSavings(client, savings) {
  for (const record of savings) {
    await client.query(
      `
        INSERT INTO savings_history
          (id, user_id, deposit_amount, withdrawal_amount, balance, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO UPDATE SET
          user_id = EXCLUDED.user_id,
          deposit_amount = EXCLUDED.deposit_amount,
          withdrawal_amount = EXCLUDED.withdrawal_amount,
          balance = EXCLUDED.balance,
          created_at = EXCLUDED.created_at
      `,
      [
        record.id,
        record.user_id,
        Number(record.deposit_amount || 0),
        Number(record.withdrawal_amount || 0),
        Number(record.balance || 0),
        record.created_at,
      ]
    );
  }
}

async function main() {
  const users = parseCsv('users_dataset.csv');
  const transactions = parseCsv('transactions_dataset.csv');
  const savings = parseCsv('savings_dataset.csv');

  validateDatasets(users, transactions, savings);

  if (DRY_RUN) {
    console.log('Dataset seed dry run passed');
    console.log(`Users: ${users.length}`);
    console.log(`Transactions: ${transactions.length}`);
    console.log(`Savings records: ${savings.length}`);
    return;
  }

  await db.initializeSchema();
  await db.transaction(async (client) => {
    await upsertUsers(client, users);
    await upsertTransactions(client, transactions);
    await upsertSavings(client, savings);
  });

  console.log('Dataset seed completed');
  console.log(`Upserted users: ${users.length}`);
  console.log(`Upserted transactions: ${transactions.length}`);
  console.log(`Upserted savings records: ${savings.length}`);
}

main()
  .catch((error) => {
    console.error(`Dataset seed failed: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.closePool();
  });
