// PrivateRoute.js
import React from 'react';
import {  Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
// This function can be implemented based on how you handle user authentication in your application.
function isAuthenticated(token) {
  // Replace this with your logic to check if the user is authenticated
  // For example, check the presence of a valid token
  console.log(token)
  return token !== null; // Assuming your token is not null when the user is authenticated
}

const PrivateRoute = ({ element }) => {
  const token = useSelector((state) => state.auth.token);

  return isAuthenticated(token) ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
