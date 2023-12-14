import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux/reducers/slicer';
import { useLocation, useNavigate } from 'react-router-dom';
import { Info } from 'react-feather';
import { InfoModal } from '../../modals/InfoModal';
import TextField from '@mui/material/TextField';
import axiosInstance from '../../requests/instance'; // Import your custom Axios instance

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const registered = useSelector((state) => state.modals.registered)
  const from = location.state?.from?.pathname || "/";
  const mytoken = useSelector((state) => state.auth.token)




  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('http://localhost:3001/users/login', {
        username: username,
        password: password,
      });
      if (response.data && !response.data.error) {
        console.log("this is the token at login", response.data)
        dispatch(setToken(response.data.token))
        navigate(from, {replace : true});
      }
      else
        console.log(response.data.error)
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="h-screen bg-cover bg-no-repeat flex justify-center  items-center" style={{ backgroundImage: "url('images/login-bg.jpg')" }}>
      {registered ? <InfoModal /> : null}
      <div className="lg:w-2/5 md:w-1/2 w-2/3 max-w-[509px]">
        <form onSubmit={handleLogin} className="bg-opacity-75   bg-white p-10 md:px-20 rounded-lg shadow-lg min-w-full">
          <h1 className="text-center text-5xl text-[#009EE2] font-bold font-sans">WELCOME</h1>
          <h6 className='text-center text-sm text-gray-500 font-light mb-6'>Login with username</h6>

          <div className=' flex flex-col gap-4'>

            <TextField
              value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="username" placeholder="username"
              required
              id="outlined-required"
              label="Username"

            />

            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" name="password" placeholder="password"

            />
            <h1 className='text-sm text-gray-500 text-right hover:cursor-pointer hover:underline'>forgot password ?</h1>
          </div>
          <div className=' flex flex-col justify-center items-center'>

            <button onClick={handleLogin} type="submit" className="shadow mt-6 mb-3 bg-[#009EE2] w-auto rounded-lg px-7 py-2 text-lg text-white tracking-wide font-semibold font-sans">Login</button>
            <div className="flex gap-1 items-center">
              <span className='text-gray-600 text-sm'>Don’t have account? </span>
              <span className='hover:underline hover:cursor-pointer' onClick={() => navigate('/register')}>Register Now</span>
            </div>
            {/* <button type="submit" onClick={() => navigate('/register')} className="w-full shadow mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans">Register</button> */}
          </div>
        </form>
      </div>
    </div>
  )
}
