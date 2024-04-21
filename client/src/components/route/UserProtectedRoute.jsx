import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate,Outlet } from 'react-router-dom';

function UserProtectedRoute() {
  const { isAuthenticated} = useSelector(state => state.user);

  

  return isAuthenticated === true? (
    <Outlet/>
  ) : (
    <Navigate to="/auth" />
  );
}

export default UserProtectedRoute;
