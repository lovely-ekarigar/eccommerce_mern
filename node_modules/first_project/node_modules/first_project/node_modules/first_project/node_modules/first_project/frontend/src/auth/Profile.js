import React, { useState, useEffect } from 'react';
import { logoutUser } from '../api';
import { useNavigate } from 'react-router-dom';

function Profile({ user }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(user || {});

    useEffect(() => {
        if (!user) {
            navigate('/signin');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        // Call update user API
        console.log('Profile updated:', formData);
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/signin');
    };

    return (
        <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md">
            <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Profile</h2>

            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-gray-600">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Name" 
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-gray-600">Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Email" 
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-gray-600">Phone</label>
                    <input 
                        type="text" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Phone" 
                    />
                </div>

                <div className="flex justify-between space-x-4">
                    <button 
                        onClick={handleUpdate} 
                        className="w-full px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Update Profile
                    </button>
                    <button 
                        onClick={handleLogout} 
                        className="w-full px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
