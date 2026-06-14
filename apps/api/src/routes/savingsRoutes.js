// Savings Routes

const express = require('express');
const savingsController = require('../controllers/savingsController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create a new savings record
router.post('/', savingsController.createSavingsRecord);

// Get savings records for a user
router.get('/:userId', savingsController.getSavingsRecords);

// Get savings analysis for a user
router.get('/:userId/analysis', savingsController.getSavingsAnalysis);

// Get current balance for a user
router.get('/:userId/balance', savingsController.getCurrentBalance);

module.exports = router;