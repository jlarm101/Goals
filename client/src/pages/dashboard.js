import React, { useEffect, useState } from 'react';
import { getAllGoals } from '../api/goals';
import Goal from '../components/goal';
import GoalForm from '../components/goalForm';

const DashboardPage = () => {
  const [goals, setGoals] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchGoals();

    const pollingInterval = setInterval(fetchGoals, 5000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(pollingInterval);
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await getAllGoals();
      setGoals(response.data);
    } catch (error) {
      console.error('Failed to fetch goals!', error);
    }
  };

  return (
    <div>
      <h1>Hello, { username }!</h1>
      <div className='goals'>
      {goals.map((goal) => {
        console.log(goal); 
        return <Goal key={goal._id} goal={goal} />;
      })}
      </div>
      <GoalForm />
    </div>
  );
  
};

export default DashboardPage;