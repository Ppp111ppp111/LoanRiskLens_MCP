// Credit Routes

const express = require('express');
const creditController = require('../controllers/creditController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Analyze creditworthiness
router.post('/creditworthiness', creditController.analyzeCreditworthiness);

// Analyze financial behavior
router.post('/financial-behavior', creditController.analyzeFinancialBehavior);

// Generate underwriting report
router.post('/underwriting-report', creditController.generateUnderwritingReport);

// Get quick credit score
router.get('/:userId/score', creditController.getCreditScore);

module.exports = router;