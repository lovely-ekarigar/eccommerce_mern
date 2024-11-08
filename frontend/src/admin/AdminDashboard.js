import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminCategories from './Categories/AdminCategories';
import AdminProducts from './Products/AdminProducts';
import AllUsers from './Users/AllUsers';
import AllOrders from './Orders/AllOrders';



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
        <div className="w-64 h-screen p-6 text-white bg-blue-800">
          <h2 className="mb-8 text-2xl font-bold">Admin Panel</h2>
          <nav>
            <ul>
              <li>
                <Link
                  to="#"
                  onClick={() => handlePageChange('dashboard')}
                  className="block px-4 py-2 transition duration-300 rounded hover:bg-blue-700"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handlePageChange('categories')}
                  className="block px-4 py-2 transition duration-300 rounded hover:bg-blue-700"
                >
                  Manage Categories
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handlePageChange('products')}
                  className="block px-4 py-2 transition duration-300 rounded hover:bg-blue-700"
                >
                  Manage Products
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handlePageChange('users')}
                  className="block px-4 py-2 transition duration-300 rounded hover:bg-blue-700"
                >
                  Manage Users
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => handlePageChange('orders')}
                  className="block px-4 py-2 transition duration-300 rounded hover:bg-blue-700"
                >
                  Manage Orders
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Profile */}
          <div className="flex items-center mt-6 space-x-4">
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
              <h1 className="mb-6 text-3xl font-semibold text-blue-900">Admin Dashboard</h1>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Cards or Stats */}
                <div className="p-6 transition duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
                  <h3 className="mb-3 text-xl font-semibold">Total Categories</h3>
                  <p className="text-xs text-blue-600">coming soon....</p>
                </div>
                <div className="p-6 transition duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
                  <h3 className="mb-3 text-xl font-semibold">Total Products</h3>
                  <p className="text-xs text-blue-600">coming soon....</p>
                </div>
                <div className="p-6 transition duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
                  <h3 className="mb-3 text-xl font-semibold">Total Users</h3>
                  <p className="text-xs text-blue-600">coming soon....</p>
                </div>
                <div className="p-6 transition duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
                  <h3 className="mb-3 text-xl font-semibold">Total Orders</h3>
                  <p className="text-xs text-blue-600">coming soon....</p>
                </div>
              </div>
            </>
          )}

          {activePage === 'categories' && <h2><AdminCategories /></h2>}
          {activePage === 'products' && <h2><AdminProducts /></h2>}
          {activePage === 'users' && <h2><AllUsers/></h2>}
          {activePage === 'orders' && <h2><AllOrders /></h2>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
