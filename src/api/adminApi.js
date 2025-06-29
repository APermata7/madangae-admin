import { API_BASE_URL } from './base';
import Cookies from 'js-cookie';
import { getAuthToken, adminLogout, setAdminData } from '../utils/auth';

// Helper: Handle Response
const handleResponse = async (response) => {
  if (response.status === 401) {
    adminLogout();
    throw new Error('Session expired, please login again');
  }

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Request failed');
    error.status = response.status;
    throw error;
  }
  return data;
};

// Header untuk API public (login/register)
const getPublicHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'x-csrf-token': Cookies.get('XSRF-TOKEN') || ''
  };
};

// Header untuk API protected (harus login)
const getAuthHeaders = () => {
  const token = getAuthToken();
  if (!token) {
    adminLogout();
    throw new Error('Session expired');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'x-csrf-token': Cookies.get('XSRF-TOKEN') || ''
  };
};

// API Call (flexible)
const apiCall = async (url, method, body = null, isProtected = true) => {
  const options = {
    method,
    headers: isProtected ? getAuthHeaders() : getPublicHeaders(),
    credentials: 'include',
    mode: 'cors'
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${API_BASE_URL}${url}`, options);
  return await handleResponse(response);
};

// Refresh CSRF Token
export const refreshCSRFToken = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/csrf-token`, {
    credentials: 'include',
    mode: 'cors'
  });
  const data = await response.json();
  Cookies.set('XSRF-TOKEN', data.csrfToken, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
};

// Auth APIs
export const loginAdmin = async (credentials) => {
  const response = await apiCall('/admin/login', 'POST', credentials, false);
  await refreshCSRFToken();
  setAdminData(response);
  return response;
};

export const registerAdmin = async (adminData) => {
  const response = await apiCall('/admin/register', 'POST', adminData, false);
  await refreshCSRFToken();
  return response;
};

export const logoutAdmin = async () => {
  await apiCall('/admin/logout', 'POST');
  adminLogout();
};

// Protected APIs
export const getDashboardStats = async () => apiCall('/admin/dashboard', 'GET');
export const getAllMenus = async () => apiCall('/admin/menus', 'GET');
export const addMenu = async (menuData) => apiCall('/admin/menus', 'POST', menuData);
export const updateMenu = async (id, menuData) => apiCall(`/admin/menus/${id}`, 'PUT', menuData);
export const deleteMenu = async (id) => apiCall(`/admin/menus/${id}`, 'DELETE');
export const getAdminProfile = async () => apiCall('/admin/profile', 'GET');
export const updateAdminProfile = async (profileData) => apiCall('/admin/profile', 'PUT', profileData);
