const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Routes for user registration, login, and user info
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/info', authMiddleware, userController.getUserInfo);

module.exports = router;
