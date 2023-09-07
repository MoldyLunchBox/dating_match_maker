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
  const dispatch = useDispatch()
  const config = {
    headers: {
       'Content-Type': 'application/json',
      },
     withCredentials: true
   }; 
  useEffect(() => {
    async function checkTokenValidity() {
      try {
          console.log(":checking validity")
          const response = await axios.post('http://localhost:3001/api/validateToken', config);
          console.log(":response validity")
         console.log(response)
          setIsTokenValid(response.data.valid);

        } catch (error) {
          console.error('Error validating token:', error);
          localStorage.removeItem('token');
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
