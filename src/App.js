import logo from './logo.svg';
import './App.css';

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import DashboardPage from './pages/DashboardPage';
import MenuManagementPage from './pages/MenuManagementPage';
import AdminProfilePage from './pages/AdminProfilePage';
// import LoginPage from './pages/LoginPage'; // Uncomment if you add admin login

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} /> {/* Default route */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/menu-management" element={<MenuManagementPage />} />
        <Route path="/profile" element={<AdminProfilePage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */} {/* Uncomment if you add admin login */}
        {/* Add a 404 Not Found page if desired */}
      </Routes>
    </Router>
  );
};

export default App;
