import { JSX } from 'react';
import { Navigate, Routes } from 'react-router-dom';
import { PublicRouteTypes } from './types';
import { useAppSelector } from '@/hooks';

const ProtectedRoute = ({ children }: any) => {
  const { user } = useAppSelector((state: any) => state.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicRoutes = ({ children }: PublicRouteTypes): JSX.Element => {
  return <Routes>{children}</Routes>;
};

export { ProtectedRoute, PublicRoutes };
