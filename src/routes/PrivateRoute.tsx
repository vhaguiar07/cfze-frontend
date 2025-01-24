import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN } from '../views/auth/routes';

const isAuthenticated = () => {
  return document.cookie.split(';').some((cookie) => cookie.trim().startsWith('token='));
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to={LOGIN()} />;
};

export default PrivateRoute;
