import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/auth/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuth();

  // Check if user is authenticated and token is not expired
  if (!user || user.expiresAt <= Date.now()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
