import { JSX } from 'react';
import { Navigate, Routes } from 'react-router-dom';
import { PublicRouteTypes } from './types';
import { useAppSelector } from '@/hooks';
import { RootState } from '@/redux/store';
import { SITEMAP } from '@/utils/sitemap';

const ProtectedRoute = ({ children }: any) => {
  const { user } = useAppSelector((state: RootState) => state.user);
  if (!user) {
    return <Navigate to={SITEMAP.auth.index} replace />;
  }
  return children;
};

const PublicRoutes = ({ children }: PublicRouteTypes): JSX.Element => {
  return <Routes>{children}</Routes>;
};

export { ProtectedRoute, PublicRoutes };
