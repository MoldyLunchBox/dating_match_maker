import React, { useEffect, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ element, ...rest }) => {
  const [isTokenValid, setIsTokenValid] = useState(null); // Use null as initial value

  useEffect(() => {
    async function checkTokenValidity() {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.post('http://localhost:3001/api/validateToken', { token });
          setIsTokenValid(response.data.valid);
        } catch (error) {
          console.error('Error validating token:', error);
          setIsTokenValid(false);
        }
      } else {
        setIsTokenValid(false);
      }
    }

    checkTokenValidity();
  }, []);

  // Render loading state while token validation is in progress
  if (isTokenValid === null) {
    return <div>Loading...</div>;
  }

  // Render Route or Navigate based on token validity
  return isTokenValid ? (
    <Route element={element} {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
