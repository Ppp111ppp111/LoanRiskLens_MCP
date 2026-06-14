# AltCredit Intelligence Platform

## Production-Grade Alternative Credit Intelligence MCP Server

A comprehensive fintech underwriting intelligence system designed for analyzing non-traditional credit users including:

- Self-employed workers
- Gig workers
- Merchants
- Daily earners
- Non-salaried users

### Key Features

- **Alternative Credit Scoring**: Rule-based scoring without ML dependencies
- **MCP Protocol Support**: Exposes tools via Model Context Protocol
- **LangGraph Workflows**: Multi-agent orchestration for credit analysis
- **Explainable Decisions**: Clear explanations for all credit decisions
- **PostgreSQL Backend**: Raw SQL with parameterized queries
- **Production Security**: JWT auth, RBAC, rate limiting, audit logging

### Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Create database
createdb altcredit_db

# Start API server
npm run dev

# Start MCP server (separate terminal)
npm run dev:mcp

# Run tests
npm test
```

### Project Structure

```
├── apps/
│   └── api/                    # Express.js REST API
├── packages/
│   └── mcp-server/             # MCP Protocol Server
├── langgraph-workflows/         # LangGraph Agent Workflows
├── credit-engine/               # Scoring & Analysis Engine
├── shared/                      # Shared Code & Utilities
└── docs/                        # Documentation
```

### Available MCP Tools

1. `analyze_creditworthiness` - Full credit eligibility analysis
2. `analyze_financial_behavior` - Financial discipline analysis
3. `generate_underwriting_report` - Complete underwriting summary

### Credit Score Formula

```
Score = (Transaction Consistency × 0.35)
      + (Savings Discipline × 0.40)
      + (Cashflow Stability × 0.25)
```

### Risk Classification

| Score | Risk Level | Decision |
|-------|------------|----------|
| ≥70 | LOW | APPROVED |
| 40-69 | MEDIUM | REVIEW |
| <40 | HIGH | REJECTED |

### Documentation

- [Setup Guide](docs/SETUP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [LangGraph Workflows](docs/LANGGRAPH.md)
- [MCP Integration](docs/MCP_INTEGRATION.md)
- [API Documentation](docs/API.md)

### Tech Stack

- **Runtime**: Node.js 18+
- **API Framework**: Express.js
- **Protocol**: MCP (Model Context Protocol)
- **Orchestration**: LangGraph-style Workflows
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Validation**: Joi

### License

MIT
