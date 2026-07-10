# 🏦 LoanRiskLens — Alternative Credit Intelligence Platform

> **Can we safely lend money to this customer?**

LoanRiskLens is a production-grade **Alternative Credit Intelligence** platform for fintech underwriting. It evaluates behavioral financial data to make explainable lending decisions — without requiring CIBIL scores, salary slips, ITR, or formal employment history.

[![API Health](https://img.shields.io/badge/API-Live-brightgreen)](https://altcredit-apis.onrender.com/api/health)
[![MCP Health](https://img.shields.io/badge/MCP-Live-brightgreen)](https://altcredit-mcp.onrender.com/health)
[![Protocol](https://img.shields.io/badge/Protocol-MCP%20JSON--RPC%202.0-blue)](https://modelcontextprotocol.io)
[![License](https://img.shields.io/badge/License-MIT-yellow)](./LICENSE)

---

## 🗺️ Platform Architecture

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             Alternative Credit Intelligence MCP Platform                                     │
│                 Explainable AI Underwriting for Non-Salaried & Self-Employed Borrowers                      │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘


                                        ┌──────────────────────────────┐
                                        │     End Users / Clients      │
                                        │──────────────────────────────│
                                        │ • Claude Desktop             │
                                        │ • Cursor IDE                 │
                                        │ • VS Code AI                 │
                                        │ • Internal Loan Officer UI   │
                                        │ • Fintech Dashboard          │
                                        └──────────────┬───────────────┘
                                                       │
                                                       ▼
                              ┌───────────────────────────────────────────────┐
                              │               MCP Client Layer                │
                              │───────────────────────────────────────────────│
                              │ Natural Language Request                      │
                              │                                               │
                              │ "Can we approve a ₹50,000 loan?"              │
                              │ "Generate underwriting report"                │
                              │ "Analyze financial behaviour"                 │
                              └──────────────┬────────────────────────────────┘
                                             │
                                             ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               Alternative Credit MCP Server                                                  │
│──────────────────────────────────────────────────────────────────────────────────────────────────────────────│
│ MCP SDK                                                                                                      │
│                                                                                                              │
│ Registered Tools                                                                                             │
│ • analyze_creditworthiness()                                                                                 │
│ • analyze_financial_behavior()                                                                               │
│ • generate_underwriting_report()                                                                             │
│                                                                                                              │
│ Input Validation │ Authentication │ Tool Routing │ Structured JSON Output                                    │
└───────────────────────────────────────────────┬──────────────────────────────────────────────────────────────┘
                                                │
                                                ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              LangGraph Multi-Agent Workflow Engine                                            │
│                              (Shared State + Agent Orchestration)                                             │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                │
                                                ▼
                                   ┌──────────────────────────┐
                                   │ User Context Loader      │
                                   │──────────────────────────│
                                   │ Load User               │
                                   │ Validate UUID           │
                                   │ Fetch User Records      │
                                   └─────────────┬───────────┘
                                                 │
                      ┌──────────────────────────┴──────────────────────────┐
                      │                                                     │
                      ▼                                                     ▼
        ┌────────────────────────────┐                     ┌────────────────────────────┐
        │    Transaction Agent       │                     │      Savings Agent         │
        │────────────────────────────│                     │────────────────────────────│
        │ • Monthly Inflow           │                     │ • Deposit Analysis         │
        │ • Monthly Outflow          │                     │ • Withdrawal Analysis      │
        │ • Failed Transactions      │                     │ • Balance Analysis         │
        │ • Cashflow Stability       │                     │ • Savings Discipline       │
        │ • Transaction Score        │                     │ • Savings Score            │
        └──────────────┬─────────────┘                     └──────────────┬─────────────┘
                       │                                                  │
                       └──────────────────────┬───────────────────────────┘
                                              ▼
                          ┌──────────────────────────────────────────────┐
                          │          Behavior Scoring Agent              │
                          │──────────────────────────────────────────────│
                          │ Merge Transaction + Savings Signals          │
                          │                                              │
                          │ Financial Behaviour Score                    │
                          │ Financial Stability                          │
                          │ Behaviour Profile                            │
                          └──────────────────────┬───────────────────────┘
                                                 ▼
                          ┌──────────────────────────────────────────────┐
                          │         Risk Classification Agent            │
                          │──────────────────────────────────────────────│
                          │ Rule-Based Risk Engine                       │
                          │                                              │
                          │ LOW                                          │
                          │ MEDIUM                                       │
                          │ HIGH                                         │
                          │                                              │
                          │ Risk Factors                                 │
                          └──────────────────────┬───────────────────────┘
                                                 ▼
                          ┌──────────────────────────────────────────────┐
                          │        Credit Decision Agent                 │
                          │──────────────────────────────────────────────│
                          │ Loan Recommendation                          │
                          │                                              │
                          │ APPROVED                                     │
                          │ REVIEW                                       │
                          │ REJECTED                                     │
                          │                                              │
                          │ Recommended Amount                           │
                          │ Repayment Confidence                         │
                          └──────────────────────┬───────────────────────┘
                                                 ▼
                          ┌──────────────────────────────────────────────┐
                          │          Explanation Agent                   │
                          │──────────────────────────────────────────────│
                          │ Explain WHY                                  │
                          │                                              │
                          │ Human-readable report                        │
                          │ Underwriting summary                         │
                          │ Business reasoning                           │
                          └──────────────────────┬───────────────────────┘
                                                 │
                                                 ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             Credit Intelligence / Business Rules Engine                                      │
│──────────────────────────────────────────────────────────────────────────────────────────────────────────────│
│ • Credit Score Formula                                                                                       │
│ • Savings Rules                                                                                              │
│ • Cashflow Rules                                                                                             │
│ • Behaviour Rules                                                                                            │
│ • Risk Rules                                                                                                 │
│ • Loan Recommendation Rules                                                                                  │
│ • Explainability Rules                                                                                       │
└───────────────────────────────────────────────┬──────────────────────────────────────────────────────────────┘
                                                │
                                                ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                  Backend API Layer (Express.js)                                              │
│──────────────────────────────────────────────────────────────────────────────────────────────────────────────│
│ Controllers → Services → Repositories                                                                        │
│                                                                                                              │
│ /health                                                                                                      │
│ /users                                                                                                       │
│ /transactions                                                                                                │
│ /savings                                                                                                     │
│ /credit                                                                                                      │
│ /underwriting                                                                                                │
│                                                                                                              │
│ JWT │ Validation │ Error Handling │ Audit Logging                                                            │
└───────────────────────────────────────────────┬──────────────────────────────────────────────────────────────┘
                                                │
                                                ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       PostgreSQL Database                                                    │
│──────────────────────────────────────────────────────────────────────────────────────────────────────────────│
│ users                                                                                                        │
│ transactions                                                                                                 │
│ savings_history                                                                                              │
│ underwriting_reports                                                                                         │
│ audit_logs                                                                                                   │
│                                                                                                              │
│ UUID │ Indexes │ Foreign Keys │ JSONB │ Constraints                                                          │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Table of Contents

- [Business Context](#business-context)
- [System Architecture](#system-architecture)
- [Internal Components](#internal-components)
- [Credit Scoring Pipeline](#credit-scoring-pipeline)
- [LangGraph Agent Workflow](#langgraph-agent-workflow)
- [Database Schema](#database-schema)
- [Deployment Architecture](#deployment-architecture)
- [MCP Client Setup](#mcp-client-setup)
- [API Reference](#api-reference)
- [Quick Start](#quick-start)
- [Tech Stack](#tech-stack)

---

## Business Context

Fintech companies serving **self-employed and informal-income customers** need to underwrite users who lack:
- Traditional CIBIL/credit scores
- Salary slips or formal ITR
- Long credit history

LoanRiskLens analyzes **behavioral financial signals** instead:

| Signal | What it measures |
|--------|-----------------|
| Transaction consistency | Regularity of income deposits |
| Savings discipline | Deposit vs withdrawal ratio |
| Cash-flow stability | Monthly inflow/outflow balance |
| Failed transaction rate | Payment reliability |
| Withdrawal behavior | Large/frequent cash-out patterns |
| Liquidity buffer | Emergency fund availability |

**Output:** `APPROVED` / `REVIEW` / `REJECTED` with recommended loan amount and human-readable explanation.

---

## System Architecture

```mermaid
graph TB
    subgraph CLIENTS["🖥️ MCP Clients"]
        CD["Claude Desktop"]
        CU["Cursor IDE"]
        RC["REST Clients / Apps"]
        AI["Custom AI Agents"]
    end

    subgraph RENDER["☁️ Render.com — Production"]
        subgraph MCP_SVC["altcredit-mcp.onrender.com"]
            MCP_EP["POST /mcp · JSON-RPC 2.0"]
            MCP_H["GET /health"]
        end
        subgraph API_SVC["altcredit-apis.onrender.com"]
            API_EP["REST API · /api/*"]
            API_H["GET /api/health"]
        end
    end

    subgraph DB["🗄️ Supabase · PostgreSQL"]
        T1["users"]
        T2["transactions"]
        T3["savings_history"]
        T4["underwriting_reports"]
        T5["audit_logs"]
    end

    CD -- "JSON-RPC POST" --> MCP_EP
    CU -- "JSON-RPC POST" --> MCP_EP
    AI -- "JSON-RPC POST" --> MCP_EP
    RC -- "HTTP REST" --> API_EP
    MCP_EP -- "calls creditService" --> API_SVC
    API_SVC -- "pg Pool" --> DB
    MCP_EP -- "pg Pool" --> DB
```

---

## Internal Components

```mermaid
graph TB
    subgraph MCP["packages/mcp-server"]
        MCPS["mcpServer.js · HTTP JSON-RPC Router"]
        TOOLS["creditTools.js · Tool Definitions + Dispatcher"]
        MCPS --> TOOLS
    end

    subgraph API["apps/api"]
        CS["creditService.js\nanalyzeCreditworthiness()\nanalyzeFinancialBehavior()\ngenerateUnderwritingReport()"]
        TS["transactionService.js\nanalyzeTransactions()"]
        SS["savingsService.js\nanalyzeSavings()"]
        RP["Repositories\nreport · user · transaction · savings · audit"]
    end

    subgraph ENGINE["credit-engine"]
        SC["scoring/index.js\ncalculateTransactionConsistencyScore()\ncalculateSavingsDisciplineScore()\ncalculateCashflowStabilityScore()\ncalculateOverallBehaviorScore()\ncalculateCreditScore()"]
        AN["analysis/index.js\nclassifyRisk()\nanalyzeSavingsProfile()\nanalyzeWithdrawalBehavior()"]
    end

    subgraph SHARED["shared/"]
        CFG["config · DB / JWT / Weights / Loan"]
        DBS["database · pg Pool · query() · transaction()"]
        HLP["helpers · generateCreditDecision()\ncalculateRecommendedLoanAmount()"]
    end

    TOOLS --> CS
    CS --> TS
    CS --> SS
    CS --> SC
    CS --> AN
    CS --> HLP
    TS --> RP
    SS --> RP
    RP --> DBS
    SC --> CFG
    SC --> HLP
```

---

## Credit Scoring Pipeline

```mermaid
flowchart LR
    IN(["User ID"]) --> UA["assertUserExists()"]

    UA -->|found| TA["TransactionService\nLast 6 months data"]
    UA -->|not found| ERR(["isError: true\nUser not found"])

    TA --> TX["Transaction Summary\ntotalTransactions\nfailedTransactions\nmonthlyInflow/Outflow\nincomeConsistencyScore"]

    IN --> SA["SavingsService\nAll history"]
    SA --> SV["Savings Summary\ntotalDeposits/Withdrawals\ncurrentBalance\ndepositCount"]

    TX --> S1["Transaction\nConsistency Score\nx 0.35"]
    SV --> S2["Savings\nDiscipline Score\nx 0.40"]
    TX --> S3["Cashflow\nStability Score\nx 0.25"]

    S1 --> WA["Weighted\nOverall Score\n0 to 100"]
    S2 --> WA
    S3 --> WA

    WA --> CS["Credit Score\nplus/minus adjustments\nfor bonuses/penalties"]

    CS --> RISK["Risk Level\n70+ = LOW\n40-69 = MEDIUM\nbelow 40 = HIGH"]

    RISK --> DEC["Decision\nLOW+60 = APPROVED\nMEDIUM+40 = REVIEW\nelse = REJECTED"]

    DEC --> AMT["Recommended Amount\nLOW x 0.7\nMEDIUM x 0.5\nHIGH x 0.2"]

    DEC --> OUT(["Underwriting Report\nSaved to DB"])
    RISK --> OUT
    AMT --> OUT
```

### Scoring Formula

```
Credit Score = (Transaction Consistency × 0.35)
             + (Savings Discipline     × 0.40)
             + (Cashflow Stability     × 0.25)
```

### Risk & Decision Table

| Score | Risk Level | Decision | Max Loan |
|-------|-----------|----------|----------|
| ≥ 70  | `LOW`     | **APPROVED** | Up to ₹2,00,000 |
| 40–69 | `MEDIUM`  | **REVIEW**   | Up to ₹75,000  |
| < 40  | `HIGH`    | **REJECTED** | Not applicable |

---

## LangGraph Agent Workflow

```mermaid
sequenceDiagram
    participant C as Client
    participant W as CreditIntelligenceWorkflow
    participant A1 as TransactionAnalysisAgent
    participant A2 as SavingsAnalysisAgent
    participant A3 as BehaviorScoringAgent
    participant A4 as RiskClassificationAgent
    participant A5 as CreditDecisionAgent
    participant A6 as ExplanationAgent
    participant DB as PostgreSQL

    C->>W: execute(userId)

    W->>A1: execute(userId)
    A1->>DB: getTransactionSummary()
    DB-->>A1: transactions
    A1-->>W: transactionStabilityScore

    W->>A2: execute(userId)
    A2->>DB: getSavingsSummary()
    DB-->>A2: savings
    A2-->>W: savingsScore, liquidityScore

    W->>A3: execute(txAnalysis, savingsAnalysis)
    A3-->>W: overallScore + breakdown

    W->>A4: execute(behaviorScore, txAnalysis, savingsAnalysis)
    A4-->>W: riskLevel + riskFactors

    W->>A5: execute(riskClassification, behaviorScore)
    A5-->>W: decision + recommendedAmount + loanTerms

    W->>A6: execute(creditDecision, riskClassification)
    A6-->>W: mainExplanation + plainLanguageSummary

    W-->>C: Complete Workflow Result
```

---

## Database Schema

```mermaid
erDiagram
    users {
        UUID id PK
        VARCHAR name
        VARCHAR phone UK
        VARCHAR occupation
        VARCHAR employer_name
        DECIMAL monthly_income
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    transactions {
        UUID id PK
        UUID user_id FK
        DECIMAL amount
        VARCHAR type
        VARCHAR status
        VARCHAR category
        TEXT description
        TIMESTAMP timestamp
    }

    savings_history {
        UUID id PK
        UUID user_id FK
        DECIMAL deposit_amount
        DECIMAL withdrawal_amount
        DECIMAL balance
        TIMESTAMP created_at
    }

    underwriting_reports {
        UUID id PK
        UUID user_id FK
        INTEGER credit_score
        VARCHAR risk_level
        DECIMAL recommended_amount
        VARCHAR recommendation
        TEXT explanation
        JSONB details
        TIMESTAMP created_at
    }

    audit_logs {
        UUID id PK
        UUID user_id FK
        VARCHAR action
        VARCHAR resource
        JSONB details
        VARCHAR ip_address
        TIMESTAMP created_at
    }

    users ||--o{ transactions : "has"
    users ||--o{ savings_history : "has"
    users ||--o{ underwriting_reports : "has"
    users ||--o{ audit_logs : "has"
```

---

## Deployment Architecture

```mermaid
graph TB
    subgraph DEV["Local Development"]
        CODE["Source Code"]
        CSV["CSV Datasets\nusers · transactions · savings"]
        SEED["npm run seed"]
    end

    subgraph GH["GitHub"]
        REPO["Ppp111ppp111/LoanRiskLens_MCP\nbranch: main"]
    end

    subgraph RENDER["Render.com"]
        SVC1["altcredit-apis\nNode.js · PORT 3000\nnpm run dev"]
        SVC2["altcredit-mcp\nNode.js · PORT 3001\nnpm run dev:mcp"]
    end

    subgraph SUPABASE["Supabase"]
        PG["PostgreSQL\naws-ap-southeast-1\nConnection Pooling"]
    end

    CODE -- "git push" --> REPO
    REPO -- "Auto Deploy" --> SVC1
    REPO -- "Auto Deploy" --> SVC2
    SVC1 -- "DATABASE_URL" --> PG
    SVC2 -- "DATABASE_URL" --> PG
    CSV --> SEED
    SEED -- "upsert" --> PG
```

---

## MCP Client Setup

Add to your MCP client config — works with **Claude Desktop**, **Cursor**, and any MCP-compatible client:

```json
{
  "mcpServers": {
    "LoanRiskLens": {
      "url": "https://altcredit-mcp.onrender.com/mcp"
    }
  }
}
```

| Client | Config File (macOS) |
|--------|---------------------|
| Claude Desktop | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Cursor | `~/.cursor/mcp.json` |

### Available MCP Tools

| Tool | Description |
|------|-------------|
| `analyze_creditworthiness` | Credit score, risk level, loan amount, decision |
| `analyze_financial_behavior` | Behavior profile, savings score, cashflow, withdrawal pattern |
| `generate_underwriting_report` | Full report — all of the above + score breakdown, saved to DB |

### Example Prompts for Claude

```
Analyze the creditworthiness of user 550e8400-e29b-41d4-a716-446655440001

Generate a full underwriting report for user ID 550e8400-e29b-41d4-a716-446655440001

Check the financial behavior profile of user 85919b78-ec7d-4d17-8e67-6a02ebfca84a
```

> **Note:** Render free tier may take 30–60 seconds on first request after inactivity (cold start).

---

## API Reference

### Credit Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/credit/analyze/:userId` | Run creditworthiness analysis |
| `GET` | `/api/credit/behavior/:userId` | Get financial behavior profile |
| `POST` | `/api/credit/report/:userId` | Generate & save underwriting report |

### Other Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | API health check |
| `GET` | `/api/users/:id` | Get user profile |
| `GET` | `/api/transactions/:userId` | List user transactions |
| `GET` | `/api/savings/:userId` | List savings history |

---

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/Ppp111ppp111/LoanRiskLens_MCP.git
cd LoanRiskLens_MCP
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env — set DB_HOST, DB_NAME, DB_USER, DB_PASSWORD

# 3. Initialize schema and seed demo data
npm run seed

# 4. Start API server (port 3000)
npm run dev

# 5. Start MCP server (port 3001, separate terminal)
npm run dev:mcp

# 6. Run tests
npm test
```

### Project Structure

```
LoanRiskLens_MCP/
├── apps/
│   └── api/                    # Express REST API (port 3000)
│       ├── src/controllers/    # Route handlers
│       ├── src/services/       # Business logic (creditService, etc.)
│       ├── src/repositories/   # DB access layer
│       └── src/middleware/     # Auth, security, error handling
├── packages/
│   └── mcp-server/             # HTTP JSON-RPC MCP Server (port 3001)
│       ├── src/server/         # mcpServer.js — JSON-RPC router
│       └── src/tools/          # creditTools.js — tool definitions
├── credit-engine/              # Pure scoring & analysis logic
│   ├── src/scoring/            # Score calculators
│   └── src/analysis/           # Risk classifier, profile analyzer
├── langgraph-workflows/        # 6-agent sequential workflow
│   ├── src/agents/             # Individual agent classes
│   └── src/workflows/          # CreditIntelligenceWorkflow
├── shared/                     # Common modules
│   ├── src/config/             # App configuration
│   ├── src/database/           # pg Pool + schema init
│   └── src/utils/              # helpers, logger, validator
├── scripts/
│   └── seed-datasets.js        # CSV → PostgreSQL seed script
└── docs/                       # Documentation
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ |
| API Framework | Express.js |
| Protocol | MCP (Model Context Protocol) — HTTP JSON-RPC 2.0 |
| Agent Workflow | LangGraph-style 6-agent pipeline |
| Database | PostgreSQL (Supabase hosted) |
| Authentication | JWT + RBAC |
| Validation | Joi |
| Logging | Winston |
| Testing | Jest |
| Deployment | Render.com (auto-deploy from GitHub) |

---

## Documentation

| Doc | Description |
|-----|-------------|
| [Agent Context Guide](docs/AGENT_CONTEXT.md) | Business context, demo questions, expected results |
| [Setup Guide](docs/SETUP.md) | Local development setup |
| [Architecture](docs/ARCHITECTURE.md) | Detailed technical architecture |
| [LangGraph Workflows](docs/LANGGRAPH.md) | Agent pipeline details |
| [MCP Integration](docs/MCP_INTEGRATION.md) | MCP server integration guide |
| [API Documentation](docs/API.md) | Full API reference |

---


