// src/auth/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error
        try {
            await registerUser(formData);
            navigate('/');
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen py-6 bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Create Account</h2>

                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block mb-2 text-lg text-gray-600">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

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

                {/* Phone Field */}
                <div>
                    <label htmlFor="phone" className="block mb-2 text-lg text-gray-600">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number (optional)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Error Message */}
                {error && <p className="mt-2 text-center text-red-600">{error}</p>}

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full py-3 text-xl text-white transition duration-200 ease-in-out bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </div>

                {/* Sign-in Redirect */}
                <div className="text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <a href="/signin" className="font-semibold text-blue-500 hover:text-blue-600">
                            Sign in here
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Signup;
