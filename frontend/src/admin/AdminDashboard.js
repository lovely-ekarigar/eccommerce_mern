import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBoxes, FaShoppingCart, FaUser, FaUsers, FaChartBar } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import AdminCategories from './Categories/AdminCategories';
import AdminProducts from './Products/AdminProducts';
import AllUsers from './Users/AllUsers';
import AllOrders from './Orders/AllOrders';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/products')
      .then(response => response.json())
      .then(data => setProductCount(data.length))
      .catch(error => console.error('Error fetching products:', error));

    fetch('http://localhost:3000/api/v1/orders')
      .then(response => response.json())
      .then(data => setOrderCount(data.length))
      .catch(error => console.error('Error fetching orders:', error));

    fetch('http://localhost:3000/api/v1/categories')
      .then(response => response.json())
      .then(data => setCategoryCount(data.data.length))
      .catch(error => console.error('Error fetching categories:', error));

    fetch('http://localhost:3000/api/v1/users')
      .then(response => response.json())
      .then(data => setUserCount(data.length))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const chartData = {
    labels: ['Categories', 'Products', 'Orders', 'Users'],
    datasets: [
      {
        label: 'Counts',
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, '#4C9AFF');
          gradient.addColorStop(1, '#4BC0C0');
          return gradient;
        },
        borderRadius: 10,
        data: [categoryCount, productCount, orderCount, userCount],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#4C9AFF',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#4C9AFF',
        },
      },
      y: {
        grid: {
          color: '#E0E0E0',
        },
        ticks: {
          color: '#4C9AFF',
        },
      },
    },
  };

  return (
    <div className="h-full bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 h-screen p-6 text-white bg-gradient-to-r from-blue-800 to-blue-600">
          <h2 className="mb-8 text-2xl font-bold">Admin Panel</h2>
          <nav>
            <ul>
              <li>
                <Link to="#" onClick={() => handlePageChange('dashboard')} className="flex items-center px-4 py-2 transition duration-300 rounded hover:bg-blue-700">
                  <FaChartBar className="mr-2" /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => handlePageChange('categories')} className="flex items-center px-4 py-2 transition duration-300 rounded hover:bg-blue-700">
                  <FaBoxes className="mr-2" /> Manage Categories
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => handlePageChange('products')} className="flex items-center px-4 py-2 transition duration-300 rounded hover:bg-blue-700">
                  <FaShoppingCart className="mr-2" /> Manage Products
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => handlePageChange('users')} className="flex items-center px-4 py-2 transition duration-300 rounded hover:bg-blue-700">
                  <FaUser className="mr-2" /> Manage Users
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => handlePageChange('orders')} className="flex items-center px-4 py-2 transition duration-300 rounded hover:bg-blue-700">
                  <FaUsers className="mr-2" /> Manage Orders
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {activePage === 'dashboard' && (
            <>
              <h1 className="mb-6 text-3xl font-semibold text-blue-900">Admin Dashboard</h1>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-center p-6 transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
                  <FaBoxes className="text-4xl text-blue-600" />
                  <h3 className="mt-3 text-xl font-semibold">Total Categories</h3>
                  <p className="text-2xl font-bold text-blue-600">{categoryCount}</p>
                </div>
                <div className="flex flex-col items-center p-6 transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
                  <FaShoppingCart className="text-4xl text-blue-600" />
                  <h3 className="mt-3 text-xl font-semibold">Total Products</h3>
                  <p className="text-2xl font-bold text-blue-600">{productCount}</p>
                </div>
                <div className="flex flex-col items-center p-6 transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
                  <FaUsers className="text-4xl text-blue-600" />
                  <h3 className="mt-3 text-xl font-semibold">Total Orders</h3>
                  <p className="text-2xl font-bold text-blue-600">{orderCount}</p>
                </div>
                <div className="flex flex-col items-center p-6 transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
                  <FaUser className="text-4xl text-blue-600" />
                  <h3 className="mt-3 text-xl font-semibold">Total Users</h3>
                  <p className="text-2xl font-bold text-blue-600">{userCount}</p>
                </div>
              </div>

              {/* Chart Section */}
              <div className="mt-8">
                <h2 className="mb-4 text-2xl font-semibold">Overview Chart</h2>
                <div style={{ height: '400px' }}>
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
            </>
          )}
          {activePage === 'categories' && <AdminCategories />}
          {activePage === 'products' && <AdminProducts />}
          {activePage === 'users' && <AllUsers />}
          {activePage === 'orders' && <AllOrders />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
