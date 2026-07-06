const fs = require('fs');
const path = require('path');

function readCsv(fileName) {
  const csv = fs.readFileSync(path.resolve(__dirname, '..', '..', fileName), 'utf8').trim();
  const [header, ...lines] = csv.split(/\r?\n/);
  const keys = header.split(',');
  return lines.map(line => Object.fromEntries(
    line.split(',').map((value, index) => [keys[index], value])
  ));
}

describe('Synthetic underwriting datasets', () => {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  it('uses valid UUIDs and connects all child rows to users', () => {
    const users = readCsv('users_dataset.csv');
    const transactions = readCsv('transactions_dataset.csv');
    const savings = readCsv('savings_dataset.csv');
    const userIds = new Set(users.map(user => user.id));

    expect(users).toHaveLength(5);
    expect(transactions).toHaveLength(184);
    expect(savings).toHaveLength(5);

    expect(users.every(user => uuidPattern.test(user.id))).toBe(true);
    expect(transactions.every(transaction => uuidPattern.test(transaction.id))).toBe(true);
    expect(savings.every(record => uuidPattern.test(record.id))).toBe(true);
    expect(transactions.every(transaction => userIds.has(transaction.user_id))).toBe(true);
    expect(savings.every(record => userIds.has(record.user_id))).toBe(true);
    expect(users.every(user => transactions.some(transaction => transaction.user_id === user.id))).toBe(true);
    expect(users.every(user => savings.some(record => record.user_id === user.id))).toBe(true);
  });
});
