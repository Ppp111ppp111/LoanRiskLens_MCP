// Transaction Routes

const express = require('express');
const transactionController = require('../controllers/transactionController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create a new transaction
router.post('/', transactionController.createTransaction);

// Get transactions for a user
router.get('/:userId', transactionController.getTransactions);

// Get transaction analysis for a user
router.get('/:userId/analysis', transactionController.getTransactionAnalysis);

// Get failed transactions for a user
router.get('/:userId/failed', transactionController.getFailedTransactions);

module.exports = router;