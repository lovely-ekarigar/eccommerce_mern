import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editOrder, setEditOrder] = useState(null);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/v1/orders');
      const ordersData = await Promise.all(
        response.data.map(async (order) => {
          try {
            // Fetch user data by userId
            const userResponse = await axios.get(`http://localhost:3000/api/v1/users/${order.userId}`);
            const userName = userResponse?.data?.name || 'Unknown';

            // Fetch product names
            const productNames = Array.isArray(order.products)
              ? await Promise.all(
                  order.products.map(async (product) => {
                    try {
                      const productResponse = await axios.get(`http://localhost:3000/api/v1/products/${product.productId}`);
                      return productResponse?.data?.name || 'Unknown Product';
                    } catch (error) {
                      console.error(`Error fetching product data: ${error}`);
                      return 'Unknown Product';
                    }
                  })
                )
              : [];

            return {
              ...order,
              userName,
              productNames,
            };
          } catch (error) {
            console.error(`Error fetching user data: ${error}`);
            return order;
          }
        })
      );
      setOrders(ordersData);
    } catch (error) {
      setError('Error fetching orders: Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Edit Order Status
  const handleEditOrder = (order) => {
    setEditOrder({
      _id: order._id,
      status: order.status,
    });
    setIsEditing(true);
  };

  // Update Order Status
  const handleUpdateOrder = async (event) => {
    event.preventDefault();
    if (!editOrder) return;

    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3000/api/v1/orders/${editOrder._id}`, { status: editOrder.status });
      setOrders(orders.map((o) => (o._id === response.data._id ? { ...o, status: response.data.status } : o)));
      setEditOrder(null);
      setIsEditing(false);
      setError('');
    } catch (error) {
      setError('Error updating order: Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Order
  const handleDeleteOrder = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/api/v1/orders/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      setError('Error deleting order: Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full p-6 mx-auto rounded-lg shadow-lg bg-white-200">
      <h1 className="mb-4 text-2xl font-bold">Orders Management</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}

      {isEditing && editOrder && (
        <form onSubmit={handleUpdateOrder} className="p-4 mb-6 space-y-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Edit Order Status</h2>
          <select
            value={editOrder.status || 'pending'}
            onChange={(e) => setEditOrder({ ...editOrder, status: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="shipped">Shipped</option>
          </select>
          <button type="submit" disabled={loading} className="px-4 py-2 text-white bg-blue-600 rounded">
            Update Status
          </button>
        </form>
      )}

      {loading && <div>Loading...</div>}

      {orders.length > 0 ? (
        <table className="w-full overflow-hidden bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Products</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="px-4 py-2">{order.userName || 'Unknown User'}</td>
                <td className="px-4 py-2">{order.productNames?.join(", ") || 'No products'}</td>
                <td className="px-4 py-2">${order.total || '0.00'}</td>
                <td className="px-4 py-2">{order.status || 'Pending'}</td>
                <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                    <button onClick={() => handleEditOrder(order)} className="px-4 py-2 mr-2 text-white bg-yellow-500 rounded">Edit Status</button>
                    <button onClick={() => handleDeleteOrder(order._id)} className="px-4 py-2 text-white bg-red-500 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No orders found</div>
      )}
    </div>
  );
};

export default AllOrders;
