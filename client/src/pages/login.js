import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });
      console.log('Login successful!', response.data);
      navigate('/dashboard');
    } catch (error) {
      alert('Login info is incorrect');
      console.error('Login failed!', error);
    }
  };

  return (
    <div className='log-form'>
      <h1>Login</h1>
      <div className='form-group'>
      <form onSubmit={handleLogin}>
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
        
        <button className='btn btn-block' type="submit">Login</button>
      </form>
      </div>
    </div>
  );
};

export default LoginPage;