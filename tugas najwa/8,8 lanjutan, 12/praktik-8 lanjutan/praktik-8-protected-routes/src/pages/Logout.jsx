import React from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  // Clear authentication status
  localStorage.removeItem("isAuthenticated");
  
  return <Navigate to="/login" />;
};

export default Logout;