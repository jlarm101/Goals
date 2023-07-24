import React from 'react';
import { editGoal } from '../api/goals';
import { deleteGoal } from '../api/goals';
import { useState } from 'react';

const Goal = ({ goal }) => {
  const { username, title: initialTitle, description: initialDescription } = goal;
  const loggedInUserId = localStorage.getItem('userId');

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    if (goal.userId === loggedInUserId) {
      // Delete the goal if the logged-in user owns it
      try {
        await deleteGoal(goal._id);
        // Update the goals list after successful deletion
        // You can implement this logic based on your state management approach
      } catch (error) {
        console.error('Failed to delete goal:', error);
      }
    } else {
      console.log('Failed to delete goal:');
    }
  }

  const handleEdit = () => {
    if (goal.userId === loggedInUserId) {
      setEditing(true);
    } else {
      console.log('Failed to edit goal: Not authorized');
    }
  };

  const handleSave = async () => {
    // Call the editGoal function with the updated title and description
    try {
      await editGoal(goal._id, { title, description });
      setEditing(false);
    } catch (error) {
      console.error('Failed to edit goal:', error);
    }
  };

  return (
    <div className='goal'>
      {editing ? (
        <>
        <div className='editing'>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
          <button className='but-but' onClick={handleSave}>Save</button>
          </div>
        </>
        
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <p>By: {username}</p>
          {goal.userId === loggedInUserId && (
            <>
              <button className='but-but' onClick={handleDelete}>Delete</button>
              <button className='but-but' onClick={handleEdit}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};



export default Goal;