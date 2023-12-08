import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';
import { Navbar } from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setSocket } from './redux/reducers/slicer';
import { useQuery } from 'react-query';
import { checkTokenValidity } from './requests/auth';

const PrivateRoute = ({ element, ...rest }) => {
  const [isTokenValid, setIsTokenValid] = useState(null);  
  const dispatch = useDispatch()
  const { data, isLoading, isError } = useQuery('userProfile', checkTokenValidity);
  useEffect(() => {
    if (data)
      setIsTokenValid(true)
  }, [data]);
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
