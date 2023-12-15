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
import axiosInstance from './requests/instance'; // Import your custom Axios instance

const PrivateRoute = ({ element, ...rest }) => {
  const [isTokenValid, setIsTokenValid] = useState(null);  
  const [data, setData] = useState(null)
  const token = useSelector((state)=>state.auth.token)
  useEffect(  ()=>{
    const fetchtheshit = async () => {
      const response = await axiosInstance.post('/api/validateToken')
      setData(response.data.valid);
    }
     fetchtheshit()
  },[token])
  const dispatch = useDispatch()
  // const { data, isLoading, isError,refetch } = useQuery('userProfile', checkTokenValidity,{
  //   fetchPolicy: "no-cache"
  // });
  console.log("private route was called")
  useEffect(() => {
  console.log("and data is", data)

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
