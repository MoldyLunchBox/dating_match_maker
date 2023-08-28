
import React, { useEffect, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ element, ...rest }) => {
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    async function checkTokenValidity() {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

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

  return isTokenValid ? (
    <Route element={element} {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;