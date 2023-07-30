import axios from 'axios';
import React, { useState } from 'react'

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        username: username,
        password: password,
      }
      );
      // console.log(response.data.token)
      // Assuming your backend sends back a 'token' in the response data
      const token = response.data.token;
      
      // Now you can store the token in a cookie or localStorage for further use
      // For example, storing in a cookie:
      document.cookie = `token=${token}; path=/; max-age=3600; httpOnly`;
      
      // Optionally, you can redirect the user to the home page after successful login
      // window.location.replace('/home');
    } catch (error) {
      // Handle login error, e.g., show an error message to the user
      console.error('Login failed:');
    }
  };
  return (
    <div className="h-screen bg-indigo-100 flex justify-center items-center">
      <div className="lg:w-2/5 md:w-1/2 w-2/3">
        <form  onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg min-w-full">
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">Formregister</h1>
          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="username">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="username" id="username" placeholder="username" />
          </div>
        
              <div>
                <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)}  className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="password" id="password" placeholder="password" />
          </div>
      
                  <button type="submit" className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans">Register</button>
                  <button onClick={handleLogin} type="submit" className="w-full mt-6 mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans">Login</button>
        </form>
      </div>
    </div>
  )
}
