const User = require('../models/userModel');
const Goal = require('../models/goalModel');

// ...

// Retrieve goals with associated usernames
const getGoalsWithUsernames = async () => {
  try {
    // Retrieve goals
    const goals = await Goal.find();

    // Map over the goals and fetch associated usernames
    const goalsWithUsernames = await Promise.all(
      goals.map(async (goal) => {
        const { username } = await User.findById(goal.userId);
        return {
          ...goal.toObject(),
          username,
        };
      })
    );

    return goalsWithUsernames;
  } catch (error) {
    console.error('Error retrieving goals with usernames:', error);
    throw error;
  }
};



// Create a new goal
const createGoal = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    

    // Create a new goal associated with the user's ID
    const newGoal = new Goal({
      title,
      description,
      userId,
    });

    // Save the goal to the database
    await newGoal.save();

    res.status(201).json({
      message: 'Goal created successfully',
      goal: {
        title: newGoal.title,
        description: newGoal.description,
        userId: newGoal.userId,
      },
    });
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).json({ message: 'Failed to create goal' });
  }
};




// Update an existing goal
const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json(updatedGoal);
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(500).json({ message: 'Failed to update goal' });
  }
};

// Delete a goal
const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGoal = await Goal.findByIdAndRemove(id);

    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Error deleting goal:', error);
    res.status(500).json({ message: 'Failed to delete goal' });
  }
};

const getAllGoals = async (req, res) => {
  try {
    const goalsWithUsernames = await getGoalsWithUsernames();
    res.status(200).json(goalsWithUsernames);
  } catch (error) {
    console.error('Failed to fetch goals with usernames!', error);
    res.status(500).json({ message: 'Failed to fetch goals' });
  }
};


module.exports = { createGoal, updateGoal, deleteGoal, getAllGoals, getGoalsWithUsernames };