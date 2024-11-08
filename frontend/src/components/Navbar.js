import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUserFromLocalStorage } from '../api';

function Navbar() {
    const user = getUserFromLocalStorage();
    const location = useLocation(); // Get the current route

    // Check if the current route is the admin dashboard
    const isAdminDashboard = location.pathname === '/admin';

    return (
        <nav className="p-4 text-white bg-blue-800">
            <div className="flex items-center justify-between w-full mx-auto">
                <div className="space-x-4">
                    {!isAdminDashboard && (
                        <>
                            <Link to="/" className="text-sm font-semibold hover:text-gray-400">Home</Link>
                            <Link to="/about" className="text-sm font-semibold hover:text-gray-400">About</Link>
                            <Link to="/contact" className="text-sm font-semibold hover:text-gray-400">Contact</Link>
                        </>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    {!isAdminDashboard && (
                        <>
                            <Link to="/products" className="text-sm font-semibold hover:text-gray-400">Products</Link>
                            <Link to="/blog" className="text-sm font-semibold hover:text-gray-400">Blog</Link>
                        </>
                    )}
                    
                    {user ? (
                        <Link to="/profile" className="text-sm font-semibold hover:text-gray-400">Profile</Link>
                    ) : (
                        <Link to="/signin" className="text-sm font-semibold hover:text-gray-400">Signin</Link>
                    )}

                    {user?.isAdmin && !isAdminDashboard && (
                        <Link to="/admin" className="text-sm font-semibold hover:text-gray-400">Admin Dashboard</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
