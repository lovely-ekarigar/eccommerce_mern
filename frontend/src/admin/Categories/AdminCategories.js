import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', icon: '', color: '', description: '' });
  const [editCategory, setEditCategory] = useState(null);
  const [error, setError] = useState('');

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/categories');
      if (response.data.success) {
        setCategories(response.data.data); // Set categories data
      } else {
        setError('No categories found.');
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError('Error fetching categories: Please try again.');
    }
  };

  // Create new category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/categories', newCategory);
      if (response.data.success) {
        fetchCategories(); // Reload categories
        setNewCategory({ name: '', icon: '', color: '', description: '' }); // Clear the form
      } else {
        setError('Failed to create category.');
      }
    } catch (error) {
      setError('Error creating category.');
    }
  };

  // Edit category
  const handleEditCategory = (category) => {
    setEditCategory(category);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/categories/${editCategory._id}`, editCategory);
      if (response.data.success) {
        fetchCategories(); // Reload categories
        setEditCategory(null); // Clear edit form
      } else {
        setError('Failed to update category.');
      }
    } catch (error) {
      setError('Error updating category.');
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/categories/${id}`);
      if (response.data.success) {
        fetchCategories(); // Reload categories
      } else {
        setError('Failed to delete category.');
      }
    } catch (error) {
      setError('Error deleting category.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full p-6 space-y-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center">Categories Management</h1>

      {/* Error Message */}
      {error && <div className="bg-red-200 text-red-800 p-3 rounded">{error}</div>}

      {/* Create Category Form */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Create New Category</h2>
        <form onSubmit={handleCreateCategory} className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Category Icon"
              value={newCategory.icon}
              onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Category Color"
              value={newCategory.color}
              onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            placeholder="Category Description"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Category
          </button>
        </form>
      </div>

      {/* Categories Table */}
      {categories.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Icon</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Color</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category._id} className="border-b">
                  <td className="px-6 py-4">{category.name}</td>
                  <td className="px-6 py-4">
                    <i className={`fa ${category.icon}`} style={{ color: category.color }}></i>
                  </td>
                  <td className="px-6 py-4">{category.color}</td>
                  <td className="px-6 py-4">{category.description}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No categories found. Please check your API or database.</p>
      )}

      {/* Edit Category Form */}
      {editCategory && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Edit Category</h2>
          <form onSubmit={handleUpdateCategory} className="space-y-4">
            <input
              type="text"
              value={editCategory.name}
              onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={editCategory.icon}
              onChange={(e) => setEditCategory({ ...editCategory, icon: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={editCategory.color}
              onChange={(e) => setEditCategory({ ...editCategory, color: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={editCategory.description}
              onChange={(e) => setEditCategory({ ...editCategory, description: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Category
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CategoriesManagement;
