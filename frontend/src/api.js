import axios from 'axios';

// Assuming your backend API URL is this:
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Adjust with your actual backend URL
});

export default api;