const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const goalController = require('../controllers/goalController');

// Protected routes for goals
router.post('/',  authMiddleware, goalController.createGoal);
router.get('/', goalController.getAllGoals);
router.put('/:id', authMiddleware, goalController.updateGoal);
router.delete('/:id', authMiddleware, goalController.deleteGoal);

module.exports = router;