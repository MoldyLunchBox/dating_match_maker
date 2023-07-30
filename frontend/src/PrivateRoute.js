// PrivateRoute.js
import React from 'react';
import {  Navigate } from 'react-router-dom';

// This function can be implemented based on how you handle user authentication in your application.
function isAuthenticated() {
  // Replace this with your logic to check if the user is authenticated (e.g., check the presence of a valid token).
  // Return true if the user is authenticated, and false otherwise.
  return false; // Change this to your actual authentication logic
}

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
