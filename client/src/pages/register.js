import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';


const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Call the registerUser API function to send the registration request
      const response = await registerUser({ username, email, password });

      
      navigate('/dashboard');
      
      console.log('Registration successful!', response.data);
    } catch (error) {
      
      console.error('Registration failed!', error);
    }
  };

  return (
    <div className='log-form'>
      <h1>Register</h1>
      <div className='form-group'>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='btn btn-block' type="submit">Register</button>
      </form>
      </div>
    </div>
  );
};

export default RegisterPage;