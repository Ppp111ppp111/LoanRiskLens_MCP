// Credit Scoring Engine - Core scoring logic

const config = require('shared/config');
const helpers = require('shared/utils/helpers');

/**
 * Transaction Consistency Score Calculator
 * Analyzes how consistent the user's transaction patterns are
 */
function calculateTransactionConsistencyScore(transactionAnalysis) {
  const {
    totalTransactions,
    failedTransactions,
    incomeConsistencyScore,
    averageMonthlyInflow,
    averageMonthlyOutflow
  } = transactionAnalysis;

  // Factor 1: Transaction success rate (30%)
  const successRate = totalTransactions > 0
    ? ((totalTransactions - failedTransactions) / totalTransactions) * 100
    : 0;
  const failedRate = totalTransactions > 0
    ? failedTransactions / totalTransactions
    : 0;
  const successScore = successRate * 0.3;

  // Factor 2: Income consistency (40%)
  const incomeScore = incomeConsistencyScore * 0.4;

  // Factor 3: Inflow/Outflow ratio stability (30%)
  let ratioScore = 50; // Default if no transactions
  if (averageMonthlyInflow > 0 && averageMonthlyOutflow > 0) {
    const ratio = averageMonthlyInflow / averageMonthlyOutflow;
    // Ideal ratio is between 1.0 and 3.0
    if (ratio >= 1.0 && ratio <= 3.0) {
      ratioScore = 70 + Math.min(30, (ratio - 1.0) * 10);
    } else if (ratio > 0.5 && ratio < 1.0) {
      ratioScore = 50 + (ratio - 0.5) * 40;
    } else {
      ratioScore = Math.max(20, ratio * 30);
    }
  }
  const ratioScoreComponent = ratioScore * 0.3;

  let score = successScore + incomeScore + ratioScoreComponent;

  if (failedRate >= 0.25) {
    score -= 25;
  } else if (failedRate >= 0.15) {
    score -= 15;
  } else if (failedRate >= 0.10) {
    score -= 5;
  }

  if (totalTransactions > 0 && totalTransactions < 20) {
    score -= 8;
  }

  return Math.min(100, Math.max(0, Math.round(score)));
}

/**
 * Savings Discipline Score Calculator
 * Analyzes user's savings habits and discipline
 */
function calculateSavingsDisciplineScore(savingsAnalysis) {
  const {
    totalDeposits,
    totalWithdrawals,
    savingsFrequency,
  } = savingsAnalysis;
  const currentBalance = parseFloat(savingsAnalysis.currentBalance) || 0;
  const averageDepositAmount =
    parseFloat(savingsAnalysis.averageDepositAmount ?? savingsAnalysis.averageDeposit) || 0;
  const averageWithdrawalAmount =
    parseFloat(savingsAnalysis.averageWithdrawalAmount ?? savingsAnalysis.averageWithdrawal) || 0;

  // Factor 1: Savings ratio (40%)
  let savingsRatio = 50;
  if (totalDeposits > 0 && totalWithdrawals >= 0) {
    const total = totalDeposits + totalWithdrawals;
    savingsRatio = total > 0 ? (totalDeposits / total) * 100 : 50;
  }
  const ratioScore = savingsRatio * 0.4;

  // Factor 2: Deposit frequency consistency (35%)
  let frequencyScore = 50;
  if (savingsFrequency) {
    frequencyScore = Math.min(100, savingsFrequency * 10 + 50);
  }
  const frequencyComponent = frequencyScore * 0.35;

  // Factor 3: Deposit vs Withdrawal pattern (25%)
  let patternScore = 50;
  if (averageDepositAmount <= 0 && totalWithdrawals > 0) {
    patternScore = 10;
  } else if (averageDepositAmount > 0) {
    const withdrawalRatio = averageWithdrawalAmount / averageDepositAmount;
    // Lower withdrawal ratio relative to deposits = better discipline
    if (withdrawalRatio <= 0.3) {
      patternScore = 90;
    } else if (withdrawalRatio <= 0.5) {
      patternScore = 75;
    } else if (withdrawalRatio <= 0.7) {
      patternScore = 60;
    } else if (withdrawalRatio <= 1.0) {
      patternScore = 40;
    } else {
      patternScore = 20;
    }
  }
  const patternComponent = patternScore * 0.25;

  let score = ratioScore + frequencyComponent + patternComponent;

  if (currentBalance < 0) {
    score -= 15;
  } else if (totalDeposits > 0 && currentBalance < totalDeposits * 0.10) {
    score -= 6;
  }

  if (totalWithdrawals > totalDeposits) {
    score -= 12;
  }

  return Math.min(100, Math.max(0, Math.round(score)));
}

/**
 * Cashflow Stability Score Calculator
 * Analyzes overall cash flow patterns
 */
function calculateCashflowStabilityScore(transactionAnalysis, savingsAnalysis) {
  const { incomeConsistencyScore, averageMonthlyInflow, averageMonthlyOutflow } = transactionAnalysis;
  const { currentBalance } = savingsAnalysis;

  // Factor 1: Income consistency (50%)
  const incomeComponent = incomeConsistencyScore * 0.5;

  // Factor 2: Balance stability (30%)
  let balanceScore = 50;
  if (currentBalance > 0) {
    // Higher balance relative to monthly income = more stable
    const monthsOfRunway = currentBalance / (averageMonthlyInflow || 1);
    if (monthsOfRunway >= 3) {
      balanceScore = 90;
    } else if (monthsOfRunway >= 2) {
      balanceScore = 75;
    } else if (monthsOfRunway >= 1) {
      balanceScore = 60;
    } else {
      balanceScore = 40;
    }
  }
  const balanceComponent = balanceScore * 0.3;

  // Factor 3: Positive cash flow tendency (20%)
  let cashflowScore = 50;
  if (averageMonthlyInflow > 0 && averageMonthlyOutflow >= 0) {
    const cashflowRatio = averageMonthlyInflow / (averageMonthlyOutflow || 1);
    if (cashflowRatio >= 1.25) {
      cashflowScore = 90;
    } else if (cashflowRatio >= 1.0) {
      cashflowScore = 70;
    } else if (cashflowRatio >= 0.8) {
      cashflowScore = 45;
    } else {
      cashflowScore = 25;
    }
  }
  const cashflowComponent = cashflowScore * 0.2;

  return Math.min(100, Math.max(0, Math.round(incomeComponent + balanceComponent + cashflowComponent)));
}

/**
 * Calculate overall behavior score using weighted average
 */
function calculateOverallBehaviorScore(transactionAnalysis, savingsAnalysis) {
  const transactionScore = calculateTransactionConsistencyScore(transactionAnalysis);
  const savingsScore = calculateSavingsDisciplineScore(savingsAnalysis);
  const cashflowScore = calculateCashflowStabilityScore(transactionAnalysis, savingsAnalysis);

  const weights = config.scoring.weights;

  const scores = {
    transactionConsistency: transactionScore,
    savingsDiscipline: savingsScore,
    cashflowStability: cashflowScore
  };

  const overallScore = helpers.calculateWeightedScore(scores, weights);

  return {
    overallScore,
    transactionScore,
    savingsScore,
    cashflowScore,
    breakdown: {
      transactionConsistency: {
        score: transactionScore,
        weight: weights.transactionConsistency,
        contribution: Math.round(transactionScore * weights.transactionConsistency)
      },
      savingsDiscipline: {
        score: savingsScore,
        weight: weights.savingsDiscipline,
        contribution: Math.round(savingsScore * weights.savingsDiscipline)
      },
      cashflowStability: {
        score: cashflowScore,
        weight: weights.cashflowStability,
        contribution: Math.round(cashflowScore * weights.cashflowStability)
      }
    }
  };
}

/**
 * Calculate complete credit score
 */
function calculateCreditScore(transactionAnalysis, savingsAnalysis, behavioralScore) {
  const baseScore = behavioralScore.overallScore;

  // Apply bonuses/penalties based on specific factors
  let adjustedScore = baseScore;
  const totalTransactions = transactionAnalysis.totalTransactions || 0;
  const failedTransactions = transactionAnalysis.failedTransactions || 0;
  const failedRate = totalTransactions > 0 ? failedTransactions / totalTransactions : 0;
  const averageDepositAmount =
    parseFloat(savingsAnalysis.averageDepositAmount ?? savingsAnalysis.averageDeposit) || 0;
  const averageWithdrawalAmount =
    parseFloat(savingsAnalysis.averageWithdrawalAmount ?? savingsAnalysis.averageWithdrawal) || 0;
  const currentBalance = parseFloat(savingsAnalysis.currentBalance) || 0;
  const averageMonthlyInflow = parseFloat(transactionAnalysis.averageMonthlyInflow) || 0;

  // Bonus: Very consistent transactions
  if (transactionAnalysis.totalTransactions >= 50 &&
      transactionAnalysis.failedTransactions / transactionAnalysis.totalTransactions < 0.05) {
    adjustedScore = Math.min(100, adjustedScore + 5);
  }

  // Bonus: Good savings habits
  if (savingsAnalysis.totalDeposits > savingsAnalysis.totalWithdrawals * 2) {
    adjustedScore = Math.min(100, adjustedScore + 5);
  }

  // Penalty: High withdrawal behavior
  if (averageDepositAmount > 0 && averageWithdrawalAmount > averageDepositAmount * 0.8) {
    adjustedScore = Math.max(0, adjustedScore - 10);
  }

  if (failedRate >= 0.25) {
    adjustedScore = Math.max(0, adjustedScore - 25);
  } else if (failedRate >= 0.15) {
    adjustedScore = Math.max(0, adjustedScore - 15);
  }

  if (currentBalance < 0) {
    adjustedScore = Math.max(0, adjustedScore - 20);
  } else if (averageMonthlyInflow > 0 && currentBalance < averageMonthlyInflow * 0.25) {
    adjustedScore = Math.max(0, adjustedScore - 5);
  }

  if (savingsAnalysis.totalWithdrawals > savingsAnalysis.totalDeposits) {
    adjustedScore = Math.max(0, adjustedScore - 15);
  }

  // Penalty: Very low transaction count
  if (transactionAnalysis.totalTransactions < 10) {
    adjustedScore = Math.max(0, adjustedScore - 15);
  }

  return Math.min(100, Math.max(0, Math.round(adjustedScore)));
}

module.exports = {
  calculateTransactionConsistencyScore,
  calculateSavingsDisciplineScore,
  calculateCashflowStabilityScore,
  calculateOverallBehaviorScore,
  calculateCreditScore,
};
