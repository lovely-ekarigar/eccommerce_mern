import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    street: '',
    apartment: '',
    zip: '',
    city: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/v1/users');
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users: Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const validateUser = (user) => {
    if (!user.name || !user.email || !user.phone) {
      setError('Name, email, and phone are required.');
      return false;
    }
    return true;
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    if (!validateUser(newUser)) return;

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/v1/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '', phone: '', isAdmin: false, street: '', apartment: '', zip: '', city: '', country: '' });
      setError('');
    } catch (error) {
      setError('Error creating user: Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setNewUser(user);
    setIsEditing(true);
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    if (!validateUser(newUser)) return;

    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3000/api/v1/users/${newUser._id}`, newUser);
      setUsers(users.map((u) => (u._id === response.data._id ? response.data : u)));
      setNewUser({ name: '', email: '', phone: '', isAdmin: false, street: '', apartment: '', zip: '', city: '', country: '' });
      setIsEditing(false);
      setError('');
    } catch (error) {
      setError('Error updating user: Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
        setLoading(true);
        const response = await axios.delete(`http://localhost:3000/api/v1/users/${id}`);
        console.log(response.data); // Log the response for debugging
        setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
        console.error('Error deleting user:', error.response || error); // Log more details for debugging
        setError('Error deleting user: Please try again.');
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="w-full p-6 mx-auto rounded-lg shadow-lg bg-white-200">
      <h1 className="mb-4 text-2xl font-bold">Users Management</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={isEditing ? handleUpdateUser : handleCreateUser} className="p-4 mb-6 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">{isEditing ? 'Edit User' : 'Create New User'}</h2>
        <input 
          type="text" 
          placeholder="Name" 
          value={newUser.name} 
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={newUser.email} 
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        <input 
          type="text" 
          placeholder="Phone" 
          value={newUser.phone} 
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        <input 
          type="text" 
          placeholder="Street" 
          value={newUser.street} 
          onChange={(e) => setNewUser({ ...newUser, street: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        <input 
          type="text" 
          placeholder="Apartment" 
          value={newUser.apartment} 
          onChange={(e) => setNewUser({ ...newUser, apartment: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        <input 
          type="text" 
          placeholder="Zip" 
          value={newUser.zip} 
          onChange={(e) => setNewUser({ ...newUser, zip: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        <input 
          type="text" 
          placeholder="City" 
          value={newUser.city} 
          onChange={(e) => setNewUser({ ...newUser, city: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        <input 
          type="text" 
          placeholder="Country" 
          value={newUser.country} 
          onChange={(e) => setNewUser({ ...newUser, country: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        <button type="submit" disabled={loading} className="px-4 py-2 text-white bg-blue-600 rounded">
          {isEditing ? 'Update User' : 'Create User'}
        </button>
      </form>

      {loading && <div>Loading...</div>}

      {users.length > 0 ? (
        <table className="w-full overflow-hidden bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Admin</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{`${user.street}, ${user.apartment}, ${user.city}, ${user.country}`}</td>
                <td className="px-4 py-2">{user.isAdmin ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleEditUser(user)} className="px-2 py-1 mx-1 text-white bg-yellow-500 rounded">Edit</button>
                  <button onClick={() => handleDeleteUser(user._id)} className="px-2 py-1 mx-1 text-white bg-red-500 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-gray-500">No users found. Please check your API or database.</p>
      )}
    </div>
  );
};

export default AllUsers;
