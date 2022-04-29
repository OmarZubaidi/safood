// Package imports
import React from 'react';
import { Navigate } from 'react-router-dom';

// Local imports
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute () {
  const { currentUser } = useAuth();
  return (
    currentUser
      ? <Navigate to='/main' replace />
      : <Navigate to='/login' replace />
  );
}
