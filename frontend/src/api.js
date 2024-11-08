// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/users';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const logoutUser = () => {
    localStorage.removeItem('user');
};
