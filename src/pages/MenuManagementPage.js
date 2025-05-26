// src/pages/MenuManagementPage.js
import React, { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import SuccessMessage from '../components/common/SuccessMessage';
import Modal from '../components/common/Modal';
import { getAllMenusAdmin, addMenu, updateMenu, deleteMenu } from '../api/menuAdminApi';

const MenuManagementPage = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null); // For editing, null for adding
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    imageUrl: '',
    ingredients: '', // Comma separated string
    tutorial: '',    // Comma separated string
  });

  const categories = ['Indonesian', 'Chinese', 'Italian', 'Dessert', 'Vegetarian', 'Breakfast', 'Lunch', 'Dinner'];

  const fetchMenus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllMenusAdmin();
      setMenus(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const openAddModal = () => {
    setCurrentMenu(null);
    setFormData({ name: '', category: '', description: '', imageUrl: '', ingredients: '', tutorial: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (menu) => {
    setCurrentMenu(menu);
    setFormData({
      name: menu.name,
      category: menu.category,
      description: menu.description,
      imageUrl: menu.imageUrl,
      ingredients: Array.isArray(menu.ingredients) ? menu.ingredients.join(', ') : '',
      tutorial: Array.isArray(menu.tutorial) ? menu.tutorial.join(', ') : '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMenu(null);
    setFormData({ name: '', category: '', description: '', imageUrl: '', ingredients: '', tutorial: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const menuDataToSend = {
      ...formData,
      ingredients: formData.ingredients.split(',').map(item => item.trim()).filter(item => item),
      tutorial: formData.tutorial.split(',').map(step => step.trim()).filter(step => step),
    };

    try {
      let response;
      if (currentMenu) {
        response = await updateMenu(currentMenu._id, menuDataToSend);
      } else {
        response = await addMenu(menuDataToSend);
      }
      setSuccessMessage(response.message);
      closeModal();
      fetchMenus(); // Re-fetch menus to update the list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete menu "${name}"?`)) {
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await deleteMenu(id);
      setSuccessMessage(response.message);
      fetchMenus(); // Re-fetch menus to update the list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const tableContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflowX: 'auto',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thTdStyle = {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  };

  const thStyle = {
    backgroundColor: '#f8f8f8',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '0.9em',
    color: '#555',
  };

  const imgStyle = {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '4px',
  };

  const actionButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2em',
    margin: '0 5px',
    color: '#4f46e5',
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    color: '#dc3545',
  };

  return (
    <div style={containerStyle}>
      <h1>Menu Management</h1>
      <button onClick={openAddModal} style={{ marginBottom: '20px' }}>Add New Menu</button>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)} />}

      {!loading && menus.length === 0 && !error && (
        <p>No menus found. Add one!</p>
      )}

      {!loading && menus.length > 0 && (
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Image</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Description</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menus.map(menu => (
                <tr key={menu._id}>
                  <td style={thTdStyle}>
                    <img src={menu.imageUrl || 'https://via.placeholder.com/60'} alt={menu.name} style={imgStyle} />
                  </td>
                  <td style={thTdStyle}>{menu.name}</td>
                  <td style={thTdStyle}>{menu.category}</td>
                  <td style={thTdStyle}>{menu.description.substring(0, 50)}...</td>
                  <td style={{ ...thTdStyle, textAlign: 'center' }}>
                    <button onClick={() => openEditModal(menu)} style={actionButtonStyle}>✏️</button>
                    <button onClick={() => handleDelete(menu._id, menu.name)} style={deleteButtonStyle}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title={currentMenu ? 'Edit Menu' : 'Add New Menu'}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Category:</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Image URL:</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Ingredients (comma-separated):</label>
            <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} required></textarea>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Tutorial (comma-separated steps):</label>
            <textarea name="tutorial" value={formData.tutorial} onChange={handleChange} required></textarea>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={closeModal} style={{ backgroundColor: '#6b7280' }}>Cancel</button>
            <button type="submit">{currentMenu ? 'Update Menu' : 'Add Menu'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MenuManagementPage;