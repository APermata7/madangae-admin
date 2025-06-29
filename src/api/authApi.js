import { ADMIN_API_BASE_URL } from './base';
import Cookies from 'js-cookie';

export const refreshCSRFToken = async () => {
  const response = await fetch(`${ADMIN_API_BASE_URL}/csrf-token`, {
    credentials: 'include',
    mode: 'cors',
  });
  const data = await response.json();
  Cookies.set('XSRF-TOKEN', data.csrfToken, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};