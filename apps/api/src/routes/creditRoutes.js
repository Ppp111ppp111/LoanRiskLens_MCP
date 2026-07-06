// Credit Routes

const express = require('express');
const creditController = require('../controllers/creditController');
const { authenticate, authorizeSelfOrAdmin } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Analyze creditworthiness
router.post('/creditworthiness', authorizeSelfOrAdmin, creditController.analyzeCreditworthiness);

// Analyze financial behavior
router.post('/financial-behavior', authorizeSelfOrAdmin, creditController.analyzeFinancialBehavior);

// Generate underwriting report
router.post('/underwriting-report', authorizeSelfOrAdmin, creditController.generateUnderwritingReport);

// Get quick credit score
router.get('/:userId/score', authorizeSelfOrAdmin, creditController.getCreditScore);

module.exports = router;
