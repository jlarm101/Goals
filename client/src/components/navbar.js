import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../api/auth';
import { getAllGoals } from '../api/goals';
import image from '../goals.png'

const Navbar = () => {
  return (
    <nav>
        <div className='navbar'>
      <ul>
        <div className='nav-links'>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <img className='immy' src={image}/>
        </li>
        <li>
        <button className='logout-button' onClick={logoutUser}>Logout</button>
        </li>
        </div>
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;