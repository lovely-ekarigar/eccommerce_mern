import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    countInStock: 0,
    image: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
    if (!product.name || !product.description || product.price <= 0 || !product.category || product.countInStock < 0) {
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

  const handleEditProduct = (product) => {
    setNewProduct(product);
    setIsEditing(true);
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    if (!validateProduct(newProduct)) return;

    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3000/api/v1/products/${newProduct._id}`, newProduct);
      setProducts(products.map((p) => (p._id === response.data._id ? response.data : p)));
      setNewProduct({ name: '', description: '', price: 0, category: '', countInStock: 0, image: '' });
      setIsEditing(false);
      setError('');
    } catch (error) {
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
    <div className="w-full p-6 shadow-lg bg-white-200 mx-autorounded-lg ">
      <h1 className="mb-4 text-2xl font-bold">Products Management</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      
      <form onSubmit={isEditing ? handleUpdateProduct : handleCreateProduct} className="p-4 mb-6 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">{isEditing ? 'Edit Product' : 'Create New Product'}</h2>
        <input 
          type="text" 
          placeholder="Product Name" 
          value={newProduct.name} 
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={newProduct.description} 
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={newProduct.price} 
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        
        <select 
          value={newProduct.category} 
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="w-full p-2 border rounded"
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
          className="w-full p-2 border rounded"
        />
        <input 
          type="text" 
          placeholder="Image URL" 
          value={newProduct.image} 
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        <button type="submit" disabled={loading} className="px-4 py-2 text-white bg-blue-600 rounded">
          {isEditing ? 'Update Product' : 'Create Product'}
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {products.length > 0 ? (
        <table className="w-full overflow-hidden bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="px-4 py-2">
                  <img src={product.image} alt={product.name} className="object-cover w-16 h-16 rounded-md" />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">
                  {categories.find((cat) => cat._id === product.category)?.name || 'No category assigned'}
                </td>
                <td className="px-4 py-2">{product.countInStock}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleEditProduct(product)} className="px-2 py-1 mx-1 text-white bg-yellow-500 rounded">Edit</button>
                  <button onClick={() => handleDeleteProduct(product._id)} className="px-2 py-1 mx-1 text-white bg-red-500 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-gray-500">No products found. Please check your API or database.</p>
      )}
    </div>
  );
};

export default AdminProducts;
