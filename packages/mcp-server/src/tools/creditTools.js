// MCP Credit Intelligence Tools

const creditService = require('../../../../apps/api/src/services/creditService');
const logger = require('../../../../shared/src/utils/logger');

/**
 * MCP Tool Definitions for Credit Intelligence
 */

const TOOL_DEFINITIONS = [
  {
    name: 'analyze_creditworthiness',
    description: 'Analyze whether a user is eligible for credit based on their financial behavior, transaction patterns, and savings history. Returns credit score, risk level, recommended loan amount, and decision.',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: {
          type: 'string',
          description: 'The unique identifier of the user to analyze',
          pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        },
      },
      required: ['user_id'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        credit_score: {
          type: 'integer',
          description: 'Overall credit score from 0-100',
          minimum: 0,
          maximum: 100,
        },
        risk_level: {
          type: 'string',
          enum: ['LOW', 'MEDIUM', 'HIGH'],
          description: 'Risk classification based on financial behavior',
        },
        recommended_loan_amount: {
          type: 'integer',
          description: 'Recommended loan amount in rupees',
        },
        repayment_confidence: {
          type: 'string',
          enum: ['HIGH', 'MEDIUM', 'LOW'],
          description: 'Confidence level in repayment capability',
        },
        decision: {
          type: 'string',
          enum: ['APPROVED', 'REVIEW', 'REJECTED'],
          description: 'Credit decision recommendation',
        },
        explanation: {
          type: 'string',
          description: 'Human-readable explanation of the credit decision',
        },
      },
    },
  },
  {
    name: 'analyze_financial_behavior',
    description: 'Analyze user financial discipline including savings consistency, withdrawal frequency, transaction stability, and cash flow patterns. Returns behavior profile and scoring.',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: {
          type: 'string',
          description: 'The unique identifier of the user to analyze',
          pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        },
      },
      required: ['user_id'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        behavior_profile: {
          type: 'string',
          enum: ['Stable Saver', 'Seasonal Earner', 'High Withdrawal User', 'Merchant Cash Flow User', 'New User'],
          description: 'Classification of user savings and spending behavior',
        },
        savings_score: {
          type: 'integer',
          description: 'Savings discipline score from 0-100',
          minimum: 0,
          maximum: 100,
        },
        cashflow_stability: {
          type: 'string',
          enum: ['HIGH', 'MEDIUM', 'LOW'],
          description: 'Assessment of cash flow stability',
        },
        withdrawal_behavior: {
          type: 'string',
          enum: ['NORMAL', 'HIGH', 'LOW', 'NO_WITHDRAWALS', 'HIGH_VALUE_WITHDRAWALS', 'FREQUENT_WITHDRAWALS'],
          description: 'Pattern of withdrawal behavior',
        },
      },
    },
  },
  {
    name: 'generate_underwriting_report',
    description: 'Generate a complete underwriting summary including user risk level, repayment reliability, financial stability, savings insights, and credit recommendation with detailed explanation.',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: {
          type: 'string',
          description: 'The unique identifier of the user',
          pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        },
      },
      required: ['user_id'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        user_id: { type: 'string' },
        report_date: { type: 'string', format: 'date-time' },
        credit_score: { type: 'integer' },
        risk_level: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] },
        recommendation: { type: 'string', enum: ['APPROVED', 'REVIEW', 'REJECTED'] },
        recommended_amount: { type: 'integer' },
        repayment_confidence: { type: 'string', enum: ['HIGH', 'MEDIUM', 'LOW'] },
        explanation: { type: 'string' },
        financial_behavior: {
          type: 'object',
          properties: {
            profile: { type: 'string' },
            savings_score: { type: 'integer' },
            cashflow_stability: { type: 'string' },
            withdrawal_behavior: { type: 'string' },
          },
        },
        risk_factors: {
          type: 'array',
          items: { type: 'string' },
        },
        protective_factors: {
          type: 'array',
          items: { type: 'string' },
        },
        score_breakdown: {
          type: 'object',
          properties: {
            overall: { type: 'integer' },
            transaction_consistency: { type: 'integer' },
            savings_discipline: { type: 'integer' },
            cashflow_stability: { type: 'integer' },
          },
        },
      },
    },
  },
];

/**
 * Execute MCP tool by name
 * @param {string} toolName - Name of the tool to execute
 * @param {Object} input - Tool input parameters
 * @returns {Promise<Object>} Tool execution result
 */
async function executeTool(toolName, input) {
  logger.info('MCP tool execution requested', { toolName, userId: input.user_id });

  try {
    switch (toolName) {
      case 'analyze_creditworthiness':
        return await creditService.analyzeCreditworthiness(input.user_id);

      case 'analyze_financial_behavior':
        return await creditService.analyzeFinancialBehavior(input.user_id);

      case 'generate_underwriting_report':
        return await creditService.generateUnderwritingReport(input.user_id);

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error) {
    logger.error('MCP tool execution failed', { toolName, error: error.message });
    throw error;
  }
}

/**
 * Get all tool definitions
 * @returns {Array} Array of tool definitions
 */
function getToolDefinitions() {
  return TOOL_DEFINITIONS;
}

module.exports = {
  TOOL_DEFINITIONS,
  executeTool,
  getToolDefinitions,
};
