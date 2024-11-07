import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '', // This will store the category _id
    countInStock: 0,
    image: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/v1/products');
      if (response.data && Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setError('No products found.');
      }
    } catch (error) {
      setError('Error fetching products: Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories for the dropdown
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/v1/categories');
      if (response.data && response.data.data) {
        setCategories(response.data.data); // Use response.data.data to get the categories
      } else {
        setCategories([]);
        setError('Categories data is not in the expected format.');
      }
    } catch (error) {
      setCategories([]);
      setError('Error fetching categories: Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Validate product form
  const validateProduct = (product) => {
    if (!product.name || !product.description || product.price <= 0 || !product.category || product.countInStock < 0) {
      setError('All fields are required, and price must be positive, stock count cannot be negative.');
      return false;
    }
    return true;
  };

  // Handle product creation
  const handleCreateProduct = async (event) => {
    event.preventDefault();
    if (!validateProduct(newProduct)) return;

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/v1/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: '', description: '', price: 0, category: '', countInStock: 0, image: '' });
      setError('');
    } catch (error) {
      setError('Error creating product: Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle product update
  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    if (!validateProduct(newProduct)) return;

    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3000/api/v1/products/${newProduct._id}`, newProduct);
      setProducts(products.map((product) => (product._id === response.data._id ? response.data : product)));
      setNewProduct({ name: '', description: '', price: 0, category: '', countInStock: 0, image: '' });
      setIsEditing(false);
      setError('');
    } catch (error) {
      setError('Error updating product: Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (id) => {
    try {
        setLoading(true);
        const response = await axios.delete(`http://localhost:3000/api/v1/products/${id}`);
        console.log('Delete Response:', response);  // Log the response for inspection
        setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
        console.error('Delete Error:', error.response || error);  // Log error details for debugging
        setError('Error deleting product: Please try again.');
    } finally {
        setLoading(false);
    }
};
  // Handle product edit (opens a simple edit form)
  const handleEditProduct = (product) => {
    setNewProduct(product); // Pre-fill the form with current product data
    setIsEditing(true); // Set editing state to true
  };

  return (
    <div className="products-management">
      <h1>Products Management</h1>
      {error && <div className="error-message">{error}</div>}
      
      {/* Product Creation or Update Form */}
      <h2>{isEditing ? 'Edit Product' : 'Create New Product'}</h2>
      <form onSubmit={isEditing ? handleUpdateProduct : handleCreateProduct}>
        <input 
          type="text" 
          placeholder="Product Name" 
          value={newProduct.name} 
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={newProduct.description} 
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={newProduct.price} 
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
        />
        
        {/* Category dropdown */}
        <select 
          value={newProduct.category} 
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <input 
          type="number" 
          placeholder="Count in Stock" 
          value={newProduct.countInStock} 
          onChange={(e) => setNewProduct({ ...newProduct, countInStock: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Image URL" 
          value={newProduct.image} 
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} 
        />
        <button type="submit" disabled={loading}>{isEditing ? 'Update Product' : 'Create Product'}</button>
      </form>

      {/* Product Table */}
      {loading && <div>Loading...</div>}
      {products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  {/* Display category name */}
                  {categories.find((cat) => cat._id === product.category)?.name || 'No category assigned'}
                </td>
                <td>{product.countInStock}</td>
                <td>
                  <button onClick={() => handleEditProduct(product)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found. Please check your API or database.</p>
      )}
    </div>
  );
};

export default AdminProducts;
