const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const ADMIN_API_BASE_URL = `${API_BASE_URL}/admin`;

export { API_BASE_URL, ADMIN_API_BASE_URL };