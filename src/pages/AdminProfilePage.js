// src/pages/AdminProfilePage.js
import React, { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import SuccessMessage from '../components/common/SuccessMessage';
import { getAdminProfile, updateAdminProfile } from '../api/adminApi';

// IMPORTANT: Replace with an actual Admin ID from your MongoDB database after seeding.
// You can find this in MongoDB Compass under the 'admins' collection.
const MOCK_ADMIN_ID = '6832ea310c1759e2c98c7c61'; // e.g., '66512c1c3f2d2b4a7c8e9d0b'

const AdminProfilePage = () => {
  const [adminProfile, setAdminProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Check if MOCK_ADMIN_ID is set before fetching
      // if (MOCK_ADMIN_ID === '6832ea310c1759e2c98c7c61') {
      //   setError('Please update MOCK_ADMIN_ID in AdminProfilePage.js with a real admin ID from your database.');
      //   setLoading(false);
      //   return;
      // }
      const data = await getAdminProfile(MOCK_ADMIN_ID);
      setAdminProfile(data);
      setFormData({ name: data.name, email: data.email });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await updateAdminProfile(MOCK_ADMIN_ID, formData);
      setAdminProfile(response.admin);
      setSuccessMessage(response.message);
      setIsEditing(false); // Exit editing mode
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '20px auto',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const formGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
    justifyContent: 'flex-end',
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!adminProfile) {
    return <p className="text-center margin-top-20">Admin profile not found.</p>;
  }

  return (
    <div style={containerStyle}>
      <h1>Admin Profile</h1>
      <p style={{ fontSize: '0.9em', color: '#777', marginBottom: '20px', textAlign: 'center' }}>
        (Using Admin ID: <span style={{ fontFamily: 'monospace', backgroundColor: '#eee', padding: '2px 5px', borderRadius: '4px' }}>{MOCK_ADMIN_ID}</span>)
      </p>
      {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)} />}

      {!isEditing ? (
        <div>
          <p><strong>Name:</strong> {adminProfile.name}</p>
          <p><strong>Email:</strong> {adminProfile.email}</p>
          <p><strong>Role:</strong> {adminProfile.role}</p>
          <button onClick={() => setIsEditing(true)} style={{ marginTop: '20px' }}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleUpdateProfile}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div style={buttonGroupStyle}>
            <button type="button" onClick={() => { setIsEditing(false); setFormData({ name: adminProfile.name, email: adminProfile.email }); }} style={{ backgroundColor: '#6b7280' }}>Cancel</button>
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminProfilePage;