import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/goals';

// Get all goals
export const getAllGoals = () => {
  return axios.get(BASE_URL);
};

// Create a new goal
export const createGoal = async (goalData) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const response = await axios.post(BASE_URL, goalData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};



export const deleteGoal = async (goalId) => {
  const token = localStorage.getItem('token'); 

  try {
    await axios.delete(`${BASE_URL}/${goalId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    
    console.log('Goal deleted successfully');
  } catch (error) {
    console.error('Failed to delete goal:', error);
    
  }
};

export const editGoal = async (goalId, updatedGoalData) => {
  const token = localStorage.getItem('token'); 

  try {
    await axios.put(`${BASE_URL}/${goalId}`, updatedGoalData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    
    console.log('Goal updated successfully');
  } catch (error) {
    console.error('Failed to update goal:', error);
    
  }
};
