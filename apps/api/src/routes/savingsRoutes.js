// Savings Routes

const express = require('express');
const savingsController = require('../controllers/savingsController');
const { authenticate, authorizeSelfOrAdmin } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create a new savings record
router.post('/', authorizeSelfOrAdmin, savingsController.createSavingsRecord);

// Get savings records for a user
router.get('/:userId', authorizeSelfOrAdmin, savingsController.getSavingsRecords);

// Get savings analysis for a user
router.get('/:userId/analysis', authorizeSelfOrAdmin, savingsController.getSavingsAnalysis);

// Get current balance for a user
router.get('/:userId/balance', authorizeSelfOrAdmin, savingsController.getCurrentBalance);

module.exports = router;
