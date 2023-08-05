// PrivateRoute.js
import React from 'react';
import {  Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { Navbar } from './components/Navbar';
// This function can be implemented based on how you handle user authentication in your application.
function isAuthenticated(token) {
  // Replace this with your logic to check if the user is authenticated
  // For example, check the presence of a valid token
  console.log(token)
  return token !== null; // Assuming your token is not null when the user is authenticated
}
const PrivateLayout = ({ children }) => {
  return (
    <div className='font-[Poppings] bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] min-h-screen h-full '>
      <Navbar />
      {children}
    </div>
  );
};

const PrivateRoute = ({ element }) => {
  const token = useSelector((state) => state.auth.token);

  return isAuthenticated(token) ? <PrivateLayout>{element}</PrivateLayout> : <Navigate to="/login" />;
};

export default PrivateRoute;
