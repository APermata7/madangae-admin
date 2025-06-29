import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAdmin, loginAdmin } from '../api/adminApi';
import { setAdminData } from '../utils/auth';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Client-side validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!validatePassword(formData.password)) {
        throw new Error('Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character');
      }

      const { confirmPassword, ...adminData } = formData;
      
      // Register admin
      await registerAdmin(adminData);
      
      // Auto-login after registration
      const loginResponse = await loginAdmin({
        email: formData.email,
        password: formData.password
      });

      setAdminData(loginResponse);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    boxSizing: 'border-box'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Registration</h1>

      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            required
            pattern="[a-zA-Z ]+"
            title="Name can only contain letters and spaces"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
            required
            minLength="8"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            title="Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
          />
          <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
            Password must contain at least 8 characters, including uppercase, lowercase, number and special character
          </small>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={inputStyle}
            required
            minLength="8"
          />
        </div>

        <button
          type="submit"
          style={buttonStyle}
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;