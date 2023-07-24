import api, { setAuthToken } from '../utils/api';

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    console.log('Response:', response);

    if (response && response.data) {
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data));
      const message = response.data.message;
      console.log('Registration successful!', message);
    } else {
      throw new Error('Invalid response');
    }
  } catch (error) {
    console.error('Registration failed:', error);
   
  }
};





// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    console.log('Response:', response);

    if (response && response.data) {
      const token = response.data.token;
      const userId = response.data.userId
      const username = response.data.username
      localStorage.setItem('username', username)
      localStorage.setItem('userId', userId)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data));
      setAuthToken(token); // Set the authentication token
      const message = response.data.message;
      console.log('Login successful!', message);
      return token;
    } else {
      throw new Error('Invalid response');
    }
  } catch (error) {
    console.error('Login failed:', error);
 
    throw error.response.data.message;
  }
};

export const logoutUser = () => {
  // Clear the token from localStorage 
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');

 
  window.location.href = '/';
};