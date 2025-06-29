import { Navigate, Outlet } from 'react-router-dom';
import { isAdminLoggedIn, getAdminData } from './auth';

const ProtectedRoutes = ({ requiredRoles = [] }) => {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  const adminData = getAdminData();
  if (requiredRoles.length > 0 && !requiredRoles.includes(adminData.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoutes;
