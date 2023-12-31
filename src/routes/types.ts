import { JSX } from 'react';
export type ProtectedRouteTypes = {
  redirectTo?: string;
};
export type PublicRouteTypes = {
  children: JSX.Element | JSX.Element[];
};
