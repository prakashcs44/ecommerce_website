import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate,Outlet } from 'react-router-dom';


function AdminRoute() {
    const { isAuthenticated, status,user } = useSelector(state => state.user);

     if( status === "loading" ) return null;
  
    return isAuthenticated === true && user.role === "admin"? (
      <Outlet/>
    ) : (
      <Navigate to="/" />
    );
}

export default AdminRoute
