import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

let authToken = null;

// Function to set the authentication token
export const setAuthToken = (token) => {
  authToken = token;
};

// Function to retrieve the authentication token
export const getAuthToken = () => {
  return authToken;
};

// Function to clear the authentication token
export const clearAuthToken = () => {
  authToken = null;
};

// Axios request interceptor to include the authentication token in headers
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
 