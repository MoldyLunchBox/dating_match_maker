import React, { useEffect } from 'react'
import { SearchFriends } from '../../modals/SearchFriends'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFriend } from '../../redux/reducers/slicer';
import { useSocket } from '../../requests/socket';

export const Home = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  useEffect(() => {
    if (socket)
      socket.emit("test", { test: "poop" })
  }, [socket])

  return (
    <div className='font-[Poppings] bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] h-screen '>
      <div>

      </div>
    </div>
  )
}
