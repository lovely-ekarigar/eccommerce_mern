import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: { id: '', name: '' }, // Store category as an object with id and name
    countInStock: 0,
    image: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showProductList, setShowProductList] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/v1/products');
      setProducts(response.data);
    } catch (error) {
      setError('Error fetching products: Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/v1/categories');
      setCategories(response.data.data || []);
    } catch (error) {
      setError('Error fetching categories: Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const validateProduct = (product) => {
    if (!product.name || !product.description || product.price <= 0 || !product.category.id || product.countInStock < 0) {
      setError('All fields are required, and price must be positive, stock count cannot be negative.');
      return false;
    }
    return true;
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    if (!validateProduct(newProduct)) return;

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/v1/products', {
        ...newProduct,
        category: newProduct.category.id // Send only the category ID to the server
      });
      setProducts([...products, response.data]);
      setNewProduct({ name: '', description: '', price: 0, category: { id: '', name: '' }, countInStock: 0, image: '' });
      setError('');
    } catch (error) {
      setError('Error creating product: Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      category: { id: product.category._id, name: product.category.name }, // Include category name when editing
      countInStock: product.countInStock,
      image: product.image
    });
    setIsEditing(true);
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    if (!validateProduct(newProduct)) return;

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3000/api/v1/products/${newProduct._id}`,
        {
          ...newProduct,
          category: newProduct.category.id,  // Send the category ID
        }
      );
      setProducts(products.map((p) => (p._id === response.data._id ? response.data : p)));
      setNewProduct({ name: '', description: '', price: 0, category: { id: '', name: '' }, countInStock: 0, image: '' });
      setIsEditing(false);
      setError('');
    } catch (error) {
      console.error('Error details:', error.response || error); // Log full error response
      setError('Error updating product: Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/api/v1/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      setError('Error deleting product: Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-semibold">Admin - Product Management</h1>

      {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

      <form onSubmit={isEditing ? handleUpdateProduct : handleCreateProduct} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name:</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full p-2 mt-1 text-sm border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <input
            type="text"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full p-2 mt-1 text-sm border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            className="w-full p-2 mt-1 text-sm border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category:</label>
          <select
            value={newProduct.category.id}
            onChange={(e) => setNewProduct({
              ...newProduct, 
              category: { id: e.target.value, name: e.target.options[e.target.selectedIndex].text }
            })}
            className="w-full p-2 mt-1 text-sm border border-gray-300 rounded"
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock Count:</label>
          <input
            type="number"
            value={newProduct.countInStock}
            onChange={(e) => setNewProduct({ ...newProduct, countInStock: parseInt(e.target.value) })}
            className="w-full p-2 mt-1 text-sm border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image:</label>
          <input
            type="text"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="w-full p-2 mt-1 text-sm border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 mt-4 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
          {isEditing ? 'Update Product' : 'Create Product'}
        </button>
      </form>

      <button
        onClick={() => setShowProductList(!showProductList)}
        className="w-full px-4 py-2 mt-4 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        {showProductList ? 'Hide Product List' : 'View Product List'}
      </button>

      {showProductList && (
        <div className="mt-6">
          {loading ? (
            <div className="text-center">Loading products...</div>
          ) : (
            <ul>
              {products.map((product) => (
                <li key={product._id} className="p-4 mb-4 border border-gray-300 rounded shadow-sm">
                  <h2 className="font-medium">{product.name}</h2>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Category: {product.category.name}</p>
                  <p>Stock: {product.countInStock}</p>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="px-4 py-2 mt-2 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="px-4 py-2 mt-2 ml-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
