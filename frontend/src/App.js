// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Blog from './pages/Blog';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Profile from './auth/Profile';
import AdminDashboard from './admin/AdminDashboard';
import { getUserFromLocalStorage } from './api';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = getUserFromLocalStorage();
        if (loggedInUser) setUser(loggedInUser);
    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<Products />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/signin" element={<Signin setUser={setUser} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/signin" />} />
                <Route
                    path="/admin"
                    element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
                />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
