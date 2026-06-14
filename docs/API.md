# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

All endpoints (except registration) require JWT authentication.

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Health Check

#### GET /api/health

Check API health status.

**Response**:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "service": "AltCredit Intelligence API",
    "version": "1.0.0"
  }
}
```

---

### Users

#### POST /api/users

Create a new user (registration).

**Request Body**:
```json
{
  "name": "Rahul Sharma",
  "phone": "919876543210",
  "password": "securepassword",
  "occupation": "Self Employed",
  "monthlyIncome": 75000
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Rahul Sharma",
    "phone": "919876543210",
    "occupation": "Self Employed",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### GET /api/users/:userId

Get user by ID.

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Rahul Sharma",
    "phone": "919876543210",
    "occupation": "Self Employed",
    "monthlyIncome": 75000,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Transactions

#### POST /api/transactions

Create a new transaction.

**Request Body**:
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 15000,
  "type": "CREDIT",
  "status": "SUCCESS",
  "category": "SALARY",
  "description": "Monthly salary deposit"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "amount": 15000,
    "type": "CREDIT",
    "status": "SUCCESS",
    "category": "SALARY",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

#### GET /api/transactions/:userId

Get user's transactions.

**Query Parameters**:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| startDate | ISO 8601 | - | Filter start date |
| endDate | ISO 8601 | - | Filter end date |
| limit | integer | 100 | Results per page |
| offset | integer | 0 | Pagination offset |

**Response**:
```json
{
  "success": true,
  "data": [...],
  "meta": {
    "limit": 100,
    "offset": 0,
    "count": 50
  }
}
```

#### GET /api/transactions/:userId/analysis

Get transaction analysis for a user.

**Response**:
```json
{
  "success": true,
  "data": {
    "totalTransactions": 150,
    "creditTransactions": 60,
    "debitTransactions": 90,
    "failedTransactions": 3,
    "totalCredits": 450000,
    "totalDebits": 280000,
    "averageMonthlyInflow": 45000,
    "averageMonthlyOutflow": 28000,
    "incomeConsistencyScore": 82
  }
}
```

---

### Savings

#### POST /api/savings

Create a savings record.

**Request Body**:
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "depositAmount": 10000,
  "withdrawalAmount": 0,
  "balance": 105000
}
```

#### GET /api/savings/:userId

Get user's savings records.

#### GET /api/savings/:userId/analysis

Get savings analysis.

**Response**:
```json
{
  "success": true,
  "data": {
    "totalDeposits": 150000,
    "totalWithdrawals": 45000,
    "netSavings": 105000,
    "currentBalance": 105000,
    "depositCount": 15,
    "withdrawalCount": 5,
    "averageDeposit": 10000,
    "averageWithdrawal": 9000,
    "savingsProfile": "Stable Saver",
    "savingsDisciplineScore": 78
  }
}
```

#### GET /api/savings/:userId/balance

Get current balance.

---

### Credit Analysis

#### POST /api/credit/creditworthiness

Analyze creditworthiness.

**Request Body**:
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "creditScore": 78,
    "riskLevel": "LOW",
    "recommendedLoanAmount": 50000,
    "repaymentConfidence": "HIGH",
    "decision": "APPROVED",
    "explanation": "User demonstrates stable savings behavior..."
  }
}
```

#### POST /api/credit/financial-behavior

Analyze financial behavior.

**Request Body**:
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "behaviorProfile": "Stable Saver",
    "savingsScore": 82,
    "cashflowStability": "HIGH",
    "withdrawalBehavior": "NORMAL"
  }
}
```

#### POST /api/credit/underwriting-report

Generate complete underwriting report.

**Request Body**:
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "reportDate": "2024-01-15T10:30:00.000Z",
    "creditScore": 78,
    "riskLevel": "LOW",
    "recommendation": "APPROVED",
    "recommendedAmount": 50000,
    "explanation": "Based on comprehensive analysis...",
    "financialBehavior": {...},
    "riskFactors": [],
    "protectiveFactors": [...],
    "scoreBreakdown": {...}
  }
}
```

#### GET /api/credit/:userId/score

Get quick credit score.

**Response**:
```json
{
  "success": true,
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "creditScore": 78,
    "riskLevel": "LOW",
    "decision": "APPROVED"
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation Error",
  "message": "Invalid request data",
  "details": [
    {"field": "phone", "message": "Invalid phone number format"}
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## Rate Limiting

- **Limit**: 100 requests per minute
- **Headers**:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

---

## Pagination

Use `limit` and `offset` parameters for pagination.

```
GET /api/users?limit=20&offset=0
```

Response includes meta information:
```json
{
  "meta": {
    "total": 150,
    "limit": 20,
    "offset": 0
  }
}
```
