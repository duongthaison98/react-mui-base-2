import { Navigate, useLocation } from 'react-router-dom';
import type { FCC } from '@/types/react';
import { useAppSelector } from '@/store';
import { ROUTE_PATH } from '@/constants/routes';

const ProtectedRoute: FCC = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.LOGIN}`} state={location.pathname} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
