import React, { useEffect, useState } from 'react'
import { Avatar } from '../profileComponents/Avatar'
import { LeftCards } from '../profileComponents/LeftCards'
import { Body } from '../profileComponents/Body'
import { useParams } from 'react-router-dom'
import { mySocket } from '../../utils/socket'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from '../../redux/reducers/slicer'


export const Profil = () => {
  const { username } = useParams();
  const [socket, setSocket] = useState(null)
  const token = useSelector((state) => state.auth.token)
  const profile = useSelector((state) => state.profile.profile)
  const dispatch = useDispatch()
  // init socket
  useEffect(() => {
    const newSocket = mySocket(token);
    setSocket(newSocket);

    // Clean up the socket when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [token])

  // fetch user data 
  useEffect(() => {
    if (!socket) return;

    // Listen for the event that fetches user data
    socket.on('profileData', (data) => {
      // Handle the user data received from the server
      console.log("yo yo yo",data)
      if (data.msg)
      dispatch(setProfile(data.msg))
    });

    // Emit an event to request user data from the server
    socket.emit('profileView',{token:token, username: username});

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('user_data');
    };
  }, [socket]);
  
useEffect(()=>{
console.log(profile)
},[profile])

  return (
    <div className='flex grow min-h-full gap-3  '>
      <div className="flex-none   ">

      </div>
      <div className="flex-auto md:max-w-[400px]  ">
        <div className='flex h-full flex-col'>
          {username}
          {/* Profile Picture */}
          <Avatar />
          {/* User Info Cards */}
          <LeftCards />
        </div>
      </div>
      <Body />
    </div>
  )
}
