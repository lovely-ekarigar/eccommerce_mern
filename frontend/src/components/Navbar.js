import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUserFromLocalStorage } from '../api';

function Navbar() {
    const user = getUserFromLocalStorage();
    const location = useLocation(); // Get the current route

    // Check if the current route is the admin dashboard
    const isAdminDashboard = location.pathname === '/admin';

    return (
        <nav className="text-white shadow-md bg-gradient-to-r from-blue-800 to-blue-600">
            <div className="flex items-center justify-between max-w-screen-xl p-4 mx-auto">
                <div className="text-2xl font-bold text-white">
                        <Link to="/" className="transition-all duration-300 hover:text-gray-300">TimelessTreasures</Link>
                </div>

                {/* Navbar Links */}
                <div className="flex items-center space-x-8">
                    {!isAdminDashboard && (
                        <>
                            <Link to="/" className="text-sm font-semibold transition-all duration-300 hover:text-gray-400">Home</Link>
                            <Link to="/about" className="text-sm font-semibold transition-all duration-300 hover:text-gray-400">About</Link>
                            <Link to="/contact" className="text-sm font-semibold transition-all duration-300 hover:text-gray-400">Contact</Link>
                        </>
                    )}

                    <div className="flex items-center space-x-8">
                        {!isAdminDashboard && (
                            <>
                                <Link to="/products" className="text-sm font-semibold transition-all duration-300 hover:text-gray-400">Products</Link>
                                <Link to="/blog" className="text-sm font-semibold transition-all duration-300 hover:text-gray-400">Blog</Link>
                            </>
                        )}

                        {/* User Profile/Signin Links */}
                        {user ? (
                            <Link to="/profile" className="text-sm font-semibold transition-all duration-300 hover:text-gray-400">Profile</Link>
                        ) : (
                            <Link to="/signin" className="text-sm font-semibold transition-all duration-300 hover:text-gray-400">Signin</Link>
                        )}

                        {/* Admin Dashboard Link */}
                        {user?.isAdmin && !isAdminDashboard && (
                            <Link to="/admin" className="text-sm font-semibold transition-all duration-300 hover:text-gray-400">Admin Dashboard</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
