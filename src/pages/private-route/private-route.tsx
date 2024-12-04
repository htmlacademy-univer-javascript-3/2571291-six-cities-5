import { Navigate } from 'react-router-dom';

type Props = { isAuthenticated: boolean };

function PrivateRoute({
  children,
  isAuthenticated,
}: React.PropsWithChildren<Props>) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export { PrivateRoute };
