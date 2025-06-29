import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAdminLoggedIn, adminLogout, getAdminData } from '../../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const adminData = getAdminData();

  const handleLogout = () => {
    adminLogout();
    navigate('/login');
  };

  return ( 
    <nav style={{
      backgroundColor: '#4f46e5',
      padding: '15px 20px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div>
        <Link to="/" style={{ 
          color: 'white', 
          textDecoration: 'none', 
          fontWeight: 'bold',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span>Madangae Admin</span>
        </Link>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {isAdminLoggedIn() ? (
          <>
            <Link 
              to="/dashboard" 
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                transition: 'background-color 0.2s',
                ':hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Dashboard
            </Link>
            <Link 
              to="/menu-management" 
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                transition: 'background-color 0.2s',
                ':hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Menu Management
            </Link>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontWeight: '500' }}>{adminData?.name || 'Admin'}</span>
              <button 
                onClick={handleLogout}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s',
                  ':hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                transition: 'background-color 0.2s',
                ':hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)'
                }
              }}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              style={{ 
                color: '#4f46e5', 
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: 'white',
                transition: 'background-color 0.2s',
                ':hover': {
                  backgroundColor: '#f3f4f6'
                }
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;