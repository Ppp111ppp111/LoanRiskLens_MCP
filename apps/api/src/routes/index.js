// Main Routes Index

const express = require('express');
const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactionRoutes');
const savingsRoutes = require('./savingsRoutes');
const creditRoutes = require('./creditRoutes');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'AltCredit Intelligence API',
      version: '1.0.0',
    },
  });
});

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'AltCredit Intelligence API',
      version: '1.0.0',
      description: 'Alternative Credit Intelligence Platform for fintech companies',
      endpoints: {
        users: '/api/users',
        transactions: '/api/transactions',
        savings: '/api/savings',
        credit: '/api/credit',
        health: '/api/health',
      },
    },
  });
});

// Mount route modules
router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);
router.use('/savings', savingsRoutes);
router.use('/credit', creditRoutes);

module.exports = router;