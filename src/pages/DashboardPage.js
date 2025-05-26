// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { getDashboardStats } from '../api/adminApi';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  };

  const statCardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  };

  const activityListStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const activityItemStyle = {
    padding: '10px 0',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div style={containerStyle}>
      <h1>Admin Dashboard</h1>

      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <h3>Total Menus</h3>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#4f46e5' }}>{stats.totalMenus}</p>
        </div>
        <div style={statCardStyle}>
          <h3>New Menus Today</h3>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#22c55e' }}>{stats.newMenusToday}</p>
        </div>
        <div style={statCardStyle}>
          <h3>Total Users</h3>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#3b82f6' }}>{stats.totalUsers}</p>
        </div>
        <div style={statCardStyle}>
          <h3>Active Users</h3>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#f59e0b' }}>{stats.activeUsers}</p>
        </div>
      </div>

      <h2>Latest Activity</h2>
      <div style={activityListStyle}>
        {stats.latestActivity.length === 0 ? (
          <p>No recent activity.</p>
        ) : (
          <ul>
            {stats.latestActivity.map(activity => (
              <li key={activity.id} style={activityItemStyle}>
                <div>
                  <strong>{activity.description}</strong>
                  <p style={{ fontSize: '0.8em', color: '#777' }}>{activity.date}</p>
                </div>
                <span style={{
                  backgroundColor: activity.type === 'menu_added' ? '#dcfce7' : activity.type === 'menu_edited' ? '#bfdbfe' : '#e5e7eb',
                  color: activity.type === 'menu_added' ? '#16a34a' : activity.type === 'menu_edited' ? '#2563eb' : '#4b5563',
                  padding: '5px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.75em',
                  fontWeight: 'bold',
                }}>
                  {activity.type.replace('_', ' ').toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;