// src/auth/Signin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

function Signin({ setUser }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await loginUser(formData);
            console.log(userData); // Debug: Check the response structure

            // Use userData.isAdmin to navigate
            setUser(userData); // Update user state (optional)
            navigate(userData.isAdmin ? '/admin' : '/'); // Redirect based on isAdmin
        } catch (error) {
            console.error('Signin failed:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen py-6 bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800">Sign In</h2>
                
                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block mb-2 text-lg text-gray-600">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Password Field */}
                <div>
                    <label htmlFor="password" className="block mb-2 text-lg text-gray-600">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full py-3 text-xl text-white transition duration-200 ease-in-out bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Sign In
                    </button>
                </div>

                {/* Sign-up Redirect */}
                <div className="text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <a href="/signup" className="font-semibold text-blue-500 hover:text-blue-600">
                            Sign up here
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Signin;
