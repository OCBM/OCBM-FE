'use client';
import { JSX } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

type GlobalErrorBoundaryProps = {
  children: JSX.Element;
};

function GlobalErrorBoundary(props: GlobalErrorBoundaryProps) {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{props.children}</ErrorBoundary>;
}

export default GlobalErrorBoundary;
