const express = require('express');
const router = express.Router();
const { createUser, updatePreferences, getAllUsers, getUserByEmail } = require('../controllers/userController');

// Create a new user
router.post('/', createUser);

// Update user preferences
router.put('/:id/preferences', updatePreferences);

// Get all users 
router.get('/', getAllUsers);

// Get user by email
router.get('/by-email', getUserByEmail);

module.exports = router;
