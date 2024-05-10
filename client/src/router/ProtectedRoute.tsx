import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux-store/hooks';

export function ProtectedRoute() {
  const { isLogined } = useAppSelector(state => state.user);

  if (!isLogined) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
