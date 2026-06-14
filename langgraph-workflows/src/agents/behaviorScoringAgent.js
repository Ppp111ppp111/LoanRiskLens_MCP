// Behavior Scoring Agent

const scoringEngine = require('../../../../credit-engine/src/scoring');
const logger = require('../../../../shared/src/utils/logger');

/**
 * Behavior Scoring Agent
 *
 * Generates weighted financial behavior score using rule-based logic.
 *
 * Score Formula:
 * score = (transactionConsistency * 0.35)
 *       + (savingsDiscipline * 0.40)
 *       + (cashflowStability * 0.25)
 */

class BehaviorScoringAgent {
  constructor() {
    this.name = 'BehaviorScoringAgent';
    this.description = 'Generates weighted financial behavior score';
    this.weights = {
      transactionConsistency: 0.35,
      savingsDiscipline: 0.40,
      cashflowStability: 0.25,
    };
  }

  /**
   * Execute the behavior scoring
   * @param {Object} transactionAnalysis - Transaction analysis data
   * @param {Object} savingsAnalysis - Savings analysis data
   * @returns {Object} Behavior scoring result
   */
  execute(transactionAnalysis, savingsAnalysis) {
    logger.info('BehaviorScoringAgent: Starting scoring');

    try {
      // Calculate individual component scores
      const componentScores = this.calculateComponentScores(transactionAnalysis, savingsAnalysis);

      // Calculate weighted overall score
      const overallScore = this.calculateWeightedScore(componentScores);

      // Generate stability indicators
      const stabilityIndicators = this.generateStabilityIndicators(componentScores);

      const result = {
        agent: this.name,
        timestamp: new Date().toISOString(),
        overallScore,
        componentScores,
        stabilityIndicators,
        weights: this.weights,
        breakdown: {
          transactionConsistency: {
            score: componentScores.transactionConsistency,
            weight: this.weights.transactionConsistency,
            contribution: Math.round(componentScores.transactionConsistency * this.weights.transactionConsistency),
          },
          savingsDiscipline: {
            score: componentScores.savingsDiscipline,
            weight: this.weights.savingsDiscipline,
            contribution: Math.round(componentScores.savingsDiscipline * this.weights.savingsDiscipline),
          },
          cashflowStability: {
            score: componentScores.cashflowStability,
            weight: this.weights.cashflowStability,
            contribution: Math.round(componentScores.cashflowStability * this.weights.cashflowStability),
          },
        },
      };

      logger.info('BehaviorScoringAgent: Scoring complete', {
        overallScore: result.overallScore,
        components: componentScores,
      });

      return result;
    } catch (error) {
      logger.error('BehaviorScoringAgent: Scoring failed', { error: error.message });
      throw error;
    }
  }

  /**
   * Calculate individual component scores
   * @param {Object} transactionAnalysis - Transaction analysis data
   * @param {Object} savingsAnalysis - Savings analysis data
   * @returns {Object} Component scores
   */
  calculateComponentScores(transactionAnalysis, savingsAnalysis) {
    // Transaction consistency score
    const transactionConsistency = transactionAnalysis.transactionStabilityScore || 50;

    // Savings discipline score
    const savingsDiscipline = savingsAnalysis.savingsDisciplineScore || 50;

    // Cashflow stability score
    const cashflowStability = this.calculateCashflowStability(transactionAnalysis, savingsAnalysis);

    return {
      transactionConsistency,
      savingsDiscipline,
      cashflowStability,
    };
  }

  /**
   * Calculate cashflow stability score
   * @param {Object} transactionAnalysis - Transaction analysis data
   * @param {Object} savingsAnalysis - Savings analysis data
   * @returns {number} Cashflow stability score
   */
  calculateCashflowStability(transactionAnalysis, savingsAnalysis) {
    // Factor 1: Income consistency (40%)
    const incomeComponent = (transactionAnalysis.incomeConsistencyScore || 50) * 0.4;

    // Factor 2: Inflow/outflow ratio (35%)
    let ratioScore = 50;
    const inflowOutflowRatio = transactionAnalysis.inflowOutflowRatio || 1;
    if (inflowOutflowRatio >= 1.5) {
      ratioScore = 85;
    } else if (inflowOutflowRatio >= 1.2) {
      ratioScore = 75;
    } else if (inflowOutflowRatio >= 1.0) {
      ratioScore = 65;
    } else if (inflowOutflowRatio >= 0.8) {
      ratioScore = 55;
    } else {
      ratioScore = 40;
    }
    const ratioComponent = ratioScore * 0.35;

    // Factor 3: Liquidity buffer (25%)
    const liquidityComponent = (savingsAnalysis.liquidityScore || 50) * 0.25;

    return Math.round(incomeComponent + ratioComponent + liquidityComponent);
  }

  /**
   * Calculate weighted overall score
   * @param {Object} componentScores - Individual component scores
   * @returns {number} Overall weighted score
   */
  calculateWeightedScore(componentScores) {
    const weightedSum =
      (componentScores.transactionConsistency * this.weights.transactionConsistency) +
      (componentScores.savingsDiscipline * this.weights.savingsDiscipline) +
      (componentScores.cashflowStability * this.weights.cashflowStability);

    return Math.round(weightedSum);
  }

  /**
   * Generate stability indicators
   * @param {Object} componentScores - Individual component scores
   * @returns {Object} Stability indicators
   */
  generateStabilityIndicators(componentScores) {
    return {
      transactionStability: componentScores.transactionConsistency >= 70 ? 'STABLE' : 'VOLATILE',
      savingsStability: componentScores.savingsDiscipline >= 70 ? 'STABLE' : 'VOLATILE',
      cashflowStability: componentScores.cashflowStability >= 70 ? 'STABLE' : 'VOLATILE',
      overallStability: this.calculateOverallStability(componentScores),
    };
  }

  /**
   * Calculate overall stability
   * @param {Object} componentScores - Individual component scores
   * @returns {string} Overall stability status
   */
  calculateOverallStability(componentScores) {
    const stableCount = [
      componentScores.transactionConsistency >= 70,
      componentScores.savingsDiscipline >= 70,
      componentScores.cashflowStability >= 70,
    ].filter(Boolean).length;

    if (stableCount >= 3) return 'HIGHLY_STABLE';
    if (stableCount >= 2) return 'MODERATELY_STABLE';
    if (stableCount >= 1) return 'MIXED';
    return 'UNSTABLE';
  }
}

module.exports = new BehaviorScoringAgent();
