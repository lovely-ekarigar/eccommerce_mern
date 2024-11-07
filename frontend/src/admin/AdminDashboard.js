import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminCategories from './Categories/AdminCategories';
import AdminProducts from './Products/AdminProducts';

// Dummy user data (this can be replaced with actual user data from your API)
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePic: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
};

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard'); // Default active page is 'dashboard'

  // Function to handle page change
  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="h-full bg-gray-100">
      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-blue-800 text-white h-screen p-6">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <nav>
            <ul>
              <li>
                <Link
                  to="#"
                  onClick={() => handlePageChange('dashboard')}
                  className="block py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handlePageChange('categories')}
                  className="block py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Manage Categories
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handlePageChange('products')}
                  className="block py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Manage Products
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handlePageChange('users')}
                  className="block py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Manage Users
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handlePageChange('orders')}
                  className="block py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Manage Orders
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Profile */}
          <div className="mt-6 flex items-center space-x-4">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <span className="text-white">{user.name}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activePage === 'dashboard' && (
            <>
              <h1 className="text-3xl font-semibold text-blue-900 mb-6">Admin Dashboard</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Cards or Stats */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-3">Total Categories</h3>
                  <p className="text-xs text-blue-600">coming soon....</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-3">Total Products</h3>
                  <p className="text-xs text-blue-600">coming soon....</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-3">Total Users</h3>
                  <p className="text-xs text-blue-600">coming soon....</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-3">Total Orders</h3>
                  <p className="text-xs text-blue-600">coming soon....</p>
                </div>
              </div>
            </>
          )}

          {activePage === 'categories' && <h2><AdminCategories /></h2>}
          {activePage === 'products' && <h2><AdminProducts /></h2>}
          {activePage === 'users' && <h2>Manage Users</h2>}
          {activePage === 'orders' && <h2>Manage Orders</h2>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
