// LangGraph Workflows Index

const CreditIntelligenceWorkflow = require('./workflows/creditIntelligenceWorkflow');

module.exports = {
  CreditIntelligenceWorkflow,
  createCreditIntelligenceWorkflow: CreditIntelligenceWorkflow.prototype.constructor,
};
