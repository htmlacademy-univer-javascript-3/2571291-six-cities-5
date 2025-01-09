import Spinner from '@/components/spinner';
import { useAppSelector } from '@/store/hooks';
import { AuthorizationStatus } from '@/store/types';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }: React.PropsWithChildren) {
  const { authorizationStatus, userDataLoading } = useAppSelector(
    (state) => state.reducer
  );

  if (userDataLoading) {
    return <Spinner />;
  }

  return authorizationStatus === AuthorizationStatus.Authorized ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export { PrivateRoute };
