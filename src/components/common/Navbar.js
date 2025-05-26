// src/components/common/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyles = {
    backgroundColor: '#4f46e5', /* Indigo */
    padding: '1rem',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyles = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 15px',
    fontWeight: 'bold',
  };

  return (
    <nav style={navStyles}>
      <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
        <Link to="/dashboard" style={linkStyles}>Madangae Admin</Link>
      </div>
      <div>
        <Link to="/dashboard" style={linkStyles}>Dashboard</Link>
        <Link to="/menu-management" style={linkStyles}>Menu Management</Link>
        <Link to="/profile" style={linkStyles}>Profile</Link>
        {/* Add Logout button here if you implement admin authentication */}
      </div>
    </nav>
  );
};

export default Navbar;