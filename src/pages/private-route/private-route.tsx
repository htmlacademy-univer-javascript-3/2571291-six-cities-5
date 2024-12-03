import { Navigate } from 'react-router-dom';

export default function PrivateRoute({
  children,
  isAuthenticated,
}: React.PropsWithChildren<{ isAuthenticated: boolean }>) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}
