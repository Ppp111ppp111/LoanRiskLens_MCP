# LangGraph Workflow Documentation

## Overview

The Credit Intelligence Workflow is a multi-agent system that orchestrates comprehensive creditworthiness analysis through sequential agent execution.

## Workflow Agents

### 1. Transaction Analysis Agent

**Purpose**: Analyzes transaction patterns and behavior

**Inputs**:
- User ID

**Outputs**:
```javascript
{
  agent: "TransactionAnalysisAgent",
  transactionStabilityScore: 75,
  incomeConsistencyScore: 82,
  totalTransactions: 150,
  creditTransactions: 60,
  debitTransactions: 90,
  failedTransactions: 3,
  successRate: 98.0,
  averageMonthlyInflow: 45000,
  averageMonthlyOutflow: 28000,
  transactionHealth: "EXCELLENT"
}
```

**Analysis Criteria**:
- Transaction success rate (weight: 30%)
- Income consistency (weight: 40%)
- Inflow/outflow ratio (weight: 30%)

---

### 2. Savings Analysis Agent

**Purpose**: Analyzes savings habits and discipline

**Inputs**:
- User ID

**Outputs**:
```javascript
{
  agent: "SavingsAnalysisAgent",
  savingsDisciplineScore: 78,
  savingsProfile: "Stable Saver",
  totalDeposits: 120000,
  totalWithdrawals: 15000,
  currentBalance: 105000,
  depositCount: 15,
  averageDeposit: 8000,
  liquidityScore: 85,
  liquidityStatus: "EXCELLENT"
}
```

**Profile Types**:
- Stable Saver (score ≥ 80)
- Seasonal Earner (irregular large deposits)
- High Withdrawal User (>80% withdrawal ratio)
- Merchant Cash Flow User (balanced flow)
- New User (< 10 records)

---

### 3. Behavior Scoring Agent

**Purpose**: Generates weighted financial behavior score

**Inputs**:
- Transaction analysis data
- Savings analysis data

**Scoring Formula**:
```
score =
  (transactionConsistency × 0.35)
  + (savingsDiscipline × 0.40)
  + (cashflowStability × 0.25)
```

**Outputs**:
```javascript
{
  agent: "BehaviorScoringAgent",
  overallScore: 77,
  componentScores: {
    transactionConsistency: 75,
    savingsDiscipline: 78,
    cashflowStability: 80
  },
  weights: {
    transactionConsistency: 0.35,
    savingsDiscipline: 0.40,
    cashflowStability: 0.25
  },
  stabilityIndicators: {
    transactionStability: "STABLE",
    savingsStability: "STABLE",
    cashflowStability: "STABLE",
    overallStability: "HIGHLY_STABLE"
  }
}
```

---

### 4. Risk Classification Agent

**Purpose**: Classifies user risk level

**Risk Levels**:
| Level | Criteria |
|-------|-----------|
| LOW | Score ≥ 70, stable patterns, no risk factors |
| MEDIUM | Score 40-69, some irregular patterns |
| HIGH | Score < 40, multiple risk factors |

**Inputs**:
- Behavior score data
- Transaction analysis data
- Savings analysis data

**Outputs**:
```javascript
{
  agent: "RiskClassificationAgent",
  riskLevel: "LOW",
  riskFactors: [],
  protectiveFactors: [
    "Consistent transaction history",
    "Strong savings discipline"
  ],
  riskScore: 25,
  recommendation: "Standard lending products..."
}
```

---

### 5. Credit Decision Agent

**Purpose**: Generates loan recommendation

**Decisions**:
| Decision | Risk Level | Score |
|----------|-------------|-------|
| APPROVED | LOW | ≥ 60 |
| REVIEW | MEDIUM | 40-59 |
| REJECTED | HIGH | < 40 |

**Outputs**:
```javascript
{
  agent: "CreditDecisionAgent",
  decision: "APPROVED",
  creditScore: 77,
  riskLevel: "LOW",
  recommendedAmount: 75000,
  repaymentConfidence: "HIGH",
  loanTerms: {
    baseInterestRate: 10.5,
    maxTenureMonths: 36,
    processingFeePercent: 1.0
  }
}
```

---

### 6. Explanation Agent

**Purpose**: Generates explainable summaries

**Outputs**:
```javascript
{
  agent: "ExplanationAgent",
  mainExplanation: "Based on comprehensive analysis...",
  detailedBreakdown: {...},
  recommendations: [...],
  plainLanguageSummary: "Congratulations! Your loan...",
  metadata: {
    dataQuality: "EXCELLENT",
    confidence: 85
  }
}
```

---

## Workflow Execution

### Sequential Flow

1. **Transaction Analysis** → Collects transaction data
2. **Savings Analysis** → Collects savings data
3. **Behavior Scoring** → Calculates weighted scores
4. **Risk Classification** → Determines risk level
5. **Credit Decision** → Generates recommendation
6. **Explanation** → Creates explainable output

### Error Handling

- Each agent catches and logs errors
- Workflow continues with partial data if possible
- Failed agents return error state
- Final result includes error array if any

### Performance

- Typical execution time: 500-1500ms
- Parallel data fetching where possible
- Optimized database queries
- Connection pooling enabled

## Integration with MCP

The workflow is exposed via MCP protocol:

```javascript
// MCP Request
{
  "method": "tools/call",
  "params": {
    "name": "generate_underwriting_report",
    "arguments": {
      "user_id": "550e8400-e29b-41d4-a716-446655440000"
    }
  }
}

// MCP Response
{
  "result": {
    "content": [{
      "type": "text",
      "text": "{ complete workflow result }"
    }]
  }
}
```
