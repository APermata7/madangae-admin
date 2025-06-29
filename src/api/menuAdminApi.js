import { getAuthToken } from '../utils/auth';
import Cookies from 'js-cookie';
import { refreshCSRFToken } from './authApi'; // pastikan kamu export dari situ kalau belum

const API_BASE_URL = 'http://localhost:5000/api/admin';

const getAuthHeaders = () => {
  const token = getAuthToken();
  const csrfToken = Cookies.get('XSRF-TOKEN');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'x-csrf-token': csrfToken,
  };
};

export const getAllMenusAdmin = async () => {
  const response = await fetch(`${API_BASE_URL}/menus`, {
    method: 'GET',
    headers: getAuthHeaders(),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch menus for admin');
  }

  return response.json();
};

export const addMenu = async (menuData) => {
  await refreshCSRFToken();

  const response = await fetch(`${API_BASE_URL}/menus`, {
    method: 'POST',
    headers: getAuthHeaders(),
    credentials: 'include',
    body: JSON.stringify(menuData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add menu');
  }

  return response.json();
};

export const updateMenu = async (id, menuData) => {
  await refreshCSRFToken();

  const response = await fetch(`${API_BASE_URL}/menus/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    credentials: 'include',
    body: JSON.stringify(menuData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update menu');
  }

  return response.json();
};

export const deleteMenu = async (id) => {
  await refreshCSRFToken();

  const response = await fetch(`${API_BASE_URL}/menus/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete menu');
  }

  return response.json();
};
