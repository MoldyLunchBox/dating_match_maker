import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';
import { Navbar } from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setSocket } from './redux/reducers/slicer';

const PrivateRoute = ({ element, ...rest }) => {
  const [isTokenValid, setIsTokenValid] = useState(null); // Use null as initial value
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch()

  useEffect(() => {
    async function checkTokenValidity() {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.post('http://localhost:3001/api/validateToken', { token });

          if (!socket) {
            const newSocket = io('http://localhost:3001', {
              query: { token: token }, // Pass the user token as a query parameter
            }); // Replace with your server URL
            console.log("socket is null")
          dispatch(setSocket(newSocket));
          }
          setIsTokenValid(response.data.valid);

        } catch (error) {
          console.error('Error validating token:', error);
          localStorage.removeItem('token');
          setIsTokenValid(false);
        }
      } else {
        setIsTokenValid(false);
      }
    }

    checkTokenValidity();
  }, []);
  const PrivateLayout = ({ children }) => {
    return (
      <div className='font-[Poppings]  flex flex-col bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] max-h-screen min-h-screen '>
        <Navbar />
        {children}
      </div>
    );
  };


  // Render Routes with the Route or Navigate based on token validity
  return (
    <>
      {isTokenValid ? <PrivateLayout>{element}</PrivateLayout> : <Login />}
    </>

  );
};

export default PrivateRoute;
