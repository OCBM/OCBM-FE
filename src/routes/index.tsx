import { Navigate, Outlet, Routes } from 'react-router-dom';
import { ProtectedRouteTypes, PublicRouteTypes } from './types';

const ProtectedRoute = ({ redirectTo }: ProtectedRouteTypes) => {
	const auth = true; // replace with actual authentication
	if (!auth) {
		return <Navigate to={`${redirectTo || '/auth/login '}`} replace />;
	}

	return <Outlet />;
};

const PublicRoutes = ({ children }: PublicRouteTypes): JSX.Element => {
	return <Routes>{children}</Routes>;
};

export { ProtectedRoute, PublicRoutes };
