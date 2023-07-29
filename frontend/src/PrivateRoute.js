// src/PrivateRoute.js
import { Route, Navigate } from 'react-router-dom';

const sisAuthenticated = () => {
  // Implement your logic to check if the user is authenticated here
  // For example, check if the user has a valid JWT token in localStorage
  return localStorage.getItem('token') !== null;
};

function PrivateRoute({ path, element }) {
    const isAuthenticated = true; // Replace this with your actual authentication logic
  console.log(path, element )
    return isAuthenticated ? <Route path={path} element={element} /> :  <Route path="/login" element={element} />;
  }
  
  export default PrivateRoute;