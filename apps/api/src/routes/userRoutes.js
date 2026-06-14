// User Routes

const express = require('express');
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Create a new user (public - registration)
router.post('/', userController.createUser);

// List users (admin only)
router.get('/', authenticate, authorize('admin'), userController.listUsers);

// Get user by ID
router.get('/:userId', authenticate, userController.getUserById);

// Update user
router.put('/:userId', authenticate, userController.updateUser);

// Delete user (admin only)
router.delete('/:userId', authenticate, authorize('admin'), userController.deleteUser);

module.exports = router;