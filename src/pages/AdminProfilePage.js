import React, { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import SuccessMessage from '../components/common/SuccessMessage';
import { getAdminProfile, updateAdminProfile } from '../api/adminApi';

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
      const data = await getAdminProfile();
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
      const response = await updateAdminProfile(formData);
      setAdminProfile(response.admin);
      setSuccessMessage(response.message);
      setIsEditing(false);
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
      
      {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)} />}

      {!isEditing ? (
        <div>
          <p><strong>Name:</strong> {adminProfile.name}</p>
          <p><strong>Email:</strong> {adminProfile.email}</p>
          <p><strong>Role:</strong> {adminProfile.role}</p>
          <button 
            onClick={() => setIsEditing(true)} 
            style={{ 
              marginTop: '20px',
              padding: '8px 16px',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Edit Profile
          </button>
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
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
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
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>
          <div style={buttonGroupStyle}>
            <button 
              type="button" 
              onClick={() => { 
                setIsEditing(false); 
                setFormData({ name: adminProfile.name, email: adminProfile.email }); 
              }} 
              style={{ 
                padding: '8px 16px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                padding: '8px 16px',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminProfilePage;