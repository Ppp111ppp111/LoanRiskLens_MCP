// Transaction Routes

const express = require('express');
const transactionController = require('../controllers/transactionController');
const { authenticate, authorizeSelfOrAdmin } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create a new transaction
router.post('/', authorizeSelfOrAdmin, transactionController.createTransaction);

// Get transactions for a user
router.get('/:userId', authorizeSelfOrAdmin, transactionController.getTransactions);

// Get transaction analysis for a user
router.get('/:userId/analysis', authorizeSelfOrAdmin, transactionController.getTransactionAnalysis);

// Get failed transactions for a user
router.get('/:userId/failed', authorizeSelfOrAdmin, transactionController.getFailedTransactions);

module.exports = router;
