// Shared types and interfaces

/**
 * @typedef {Object} User
 * @property {string} id - User UUID
 * @property {string} name - User's full name
 * @property {string} phone - Phone number
 * @property {string} [occupation] - User's occupation
 * @property {string} [employerName] - Employer name
 * @property {number} [monthlyIncome] - Monthly income
 * @property {Date} createdAt - Account creation date
 */

/**
 * @typedef {Object} Transaction
 * @property {string} id - Transaction UUID
 * @property {string} userId - User UUID
 * @property {number} amount - Transaction amount
 * @property {'CREDIT' | 'DEBIT'} type - Transaction type
 * @property {'SUCCESS' | 'FAILED' | 'PENDING'} status - Transaction status
 * @property {string} category - Transaction category
 * @property {string} [description] - Transaction description
 * @property {Date} timestamp - Transaction timestamp
 */

/**
 * @typedef {Object} SavingsRecord
 * @property {string} id - Record UUID
 * @property {string} userId - User UUID
 * @property {number} depositAmount - Deposit amount
 * @property {number} withdrawalAmount - Withdrawal amount
 * @property {number} balance - Current balance
 * @property {Date} createdAt - Creation timestamp
 */

/**
 * @typedef {Object} UnderwritingReport
 * @property {string} id - Report UUID
 * @property {string} userId - User UUID
 * @property {number} creditScore - Credit score (0-100)
 * @property {'LOW' | 'MEDIUM' | 'HIGH'} riskLevel - Risk classification
 * @property {number} recommendedAmount - Recommended loan amount
 * @property {'APPROVED' | 'REVIEW' | 'REJECTED'} recommendation - Loan recommendation
 * @property {string} explanation - Human-readable explanation
 * @property {Object} details - Additional report details
 * @property {Date} createdAt - Report generation timestamp
 */

/**
 * @typedef {Object} CreditworthinessAnalysis
 * @property {number} creditScore - Overall credit score
 * @property {'LOW' | 'MEDIUM' | 'HIGH'} riskLevel - Risk level
 * @property {number} recommendedLoanAmount - Recommended loan amount
 * @property {'HIGH' | 'MEDIUM' | 'LOW'} repaymentConfidence - Repayment confidence
 * @property {'APPROVED' | 'REVIEW' | 'REJECTED'} decision - Credit decision
 * @property {string} explanation - Explanation of the decision
 */

/**
 * @typedef {Object} FinancialBehaviorAnalysis
 * @property {string} behaviorProfile - User's behavior profile
 * @property {number} savingsScore - Savings discipline score
 * @property {'HIGH' | 'MEDIUM' | 'LOW'} cashflowStability - Cash flow stability
 * @property {'NORMAL' | 'HIGH' | 'LOW'} withdrawalBehavior - Withdrawal behavior pattern
 */

/**
 * @typedef {Object} TransactionAnalysis
 * @property {number} transactionStabilityScore - Stability of transactions
 * @property {number} incomeConsistencyScore - Consistency of income
 * @property {number} totalCredits - Total credit transactions
 * @property {number} totalDebits - Total debit transactions
 * @property {number} failedTransactions - Number of failed transactions
 * @property {number} averageMonthlyInflow - Average monthly inflow
 * @property {number} averageMonthlyOutflow - Average monthly outflow
 */

/**
 * @typedef {Object} SavingsAnalysis
 * @property {number} savingsDisciplineScore - Savings discipline score
 * @property {'Stable Saver' | 'Seasonal Earner' | 'High Withdrawal User' | 'Merchant Cash Flow User'} savingsProfile
 * @property {number} totalDeposits - Total deposits
 * @property {number} totalWithdrawals - Total withdrawals
 * @property {number} currentBalance - Current balance
 */

/**
 * @typedef {Object} RiskClassification
 * @property {'LOW' | 'MEDIUM' | 'HIGH'} riskLevel - Risk level
 * @property {string[]} riskFactors - List of risk factors
 * @property {string[]} protectiveFactors - List of protective factors
 */

module.exports = {
  User: {},
  Transaction: {},
  SavingsRecord: {},
  UnderwritingReport: {},
  CreditworthinessAnalysis: {},
  FinancialBehaviorAnalysis: {},
  TransactionAnalysis: {},
  SavingsAnalysis: {},
  RiskClassification: {},
};
