import Cookies from 'js-cookie';

// Simpan token ke localStorage
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('admin_token', token);
  } else {
    localStorage.removeItem('admin_token');
  }
};

// Ambil token dari localStorage
export const getAuthToken = () => {
  return localStorage.getItem('admin_token');
};

// Simpan data admin ke localStorage
export const setAdminData = (data) => {
  if (data && data.token && data.admin) {
    localStorage.setItem('admin_token', data.token);
    localStorage.setItem('admin_data', JSON.stringify(data.admin));
  }
};

// Ambil data admin dari localStorage
export const getAdminData = () => {
  const adminData = localStorage.getItem('admin_data');
  if (!adminData) return null;
  try {
    return JSON.parse(adminData);
  } catch (error) {
    console.error('Error parsing admin data:', error);
    return null;
  }
};

// Cek apakah admin masih login berdasarkan token
export const isAdminLoggedIn = () => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

// Logout admin
export const adminLogout = () => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_data');
  window.location.href = '/login';
};
