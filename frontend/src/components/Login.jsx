import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/reducers/slicer';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();




  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  console.log(document.cookie);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        username: username,
        password: password,
      });
      const token = response.data.token;
      console.log(token);
      // store the token in localStorage for further use
      localStorage.setItem('token', token);
      dispatch(setToken(token)); // Correctly dispatch the setToken action
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  return (
    <div className="h-screen bg-indigo-100 flex justify-center items-center">
      <div className="lg:w-2/5 md:w-1/2 w-2/3">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg min-w-full">
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">Formregister</h1>
          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="username">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="username" id="username" placeholder="username" />
          </div>

          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="password" id="password" placeholder="password" />
          </div>

          <button type="submit" className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans">Register</button>
          <button onClick={handleLogin} type="submit" className="w-full mt-6 mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans">Login</button>

        </form>
      </div>
    </div>
  )
}
