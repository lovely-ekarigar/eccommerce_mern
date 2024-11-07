import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
// import AdminProducts from './admin/Categories/AdminProducts';
// import AdminUsers from './admin/Categories/AdminUsers';
// import AdminOrders from './admin/Categories/AdminOrders';
import './index.css';


function App() {
  return (
   <>
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;