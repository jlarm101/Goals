import React, { useState } from 'react';
import { createGoal } from '../api/goals';
import jwtDecode from 'jwt-decode';

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token'); // Retrieve the stored token from local storage

  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Decode the JWT token
      const userId = decodedToken.userId; // Extract the user ID from the token payload

      return userId;
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }

  return null; // Return null or handle the case when the token is not found or invalid
};


const GoalForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const handleGoalSubmit = async (e) => {
    e.preventDefault();

    try {
      const goalData = {
        title,
        description,
        userId: getUserIdFromToken()
        
      };

      // Send the goal data to the backend for creation
      const response = await createGoal(goalData);

      console.log('Goal created successfully:', response.data);
      
      // Reset the form fields
      setTitle('');
      setDescription('');
      
    } catch (error) {
      alert('Login to create a goal')
      console.error('Failed to create goal:', error);
    }
  };

  return (
    <div className='form'>
      <h2>Create a New Goal</h2>
      <form onSubmit={handleGoalSubmit}>
      <div className='form-group'>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        </div>
        
        <button className='btn btn-block' type="submit">Create Goal</button>
      </form>
    </div>
  );
};

export default GoalForm;