import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAdminData } from '../utils/auth';
import { loginAdmin, refreshCSRFToken } from '../api/adminApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [csrfReady, setCsrfReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    refreshCSRFToken()
      .then(() => setCsrfReady(true))
      .catch(err => {
        console.error('Failed to refresh CSRF token:', err);
        setError('Unable to connect to server. Please try again later.');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const data = await loginAdmin({ email, password });
      if (!data.token || !data.admin) {
        throw new Error('Invalid response from server');
      }
      setAdminData(data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      let errorMessage = 'Login failed. Please try again.';
      if (err.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (err.status === 403) {
        errorMessage = err.message || 'Account locked due to too many failed attempts';
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Login</h1>

      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}
            required
            minLength="8"
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          disabled={loading || !csrfReady}
        >
          {loading ? <LoadingSpinner /> : csrfReady ? 'Login' : 'Loading...'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
