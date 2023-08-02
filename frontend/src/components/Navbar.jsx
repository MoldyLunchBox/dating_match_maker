import React, { useEffect, useState } from 'react'
import { X } from 'react-feather';
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFriend } from '../redux/reducers/slicer';

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch()
  useEffect(()=>{
    
  })
  const toggleMenu = () => {
    const navLinks = document.querySelector('.nav-links')
    navLinks.classList.toggle('top-[9%]')
    setShowMenu(!showMenu);
  };
  const handleSearchFriend = () =>{
    dispatch(setSearchFriend(true))
  }
  return (
    <header className='bg-white'>
      <nav className='flex   justify-between mx-auto items-center w-[92%]'>
        <div>
          profil pic
        </div>
        <div className='nav-links duration-500 md:static absolute bg-white md:min-h-fit  min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5'>

          <ul className='flex  md:flex-row flex-col md:items-center md:gap-[4vw] gap-8'>
            <li>
              <a className='hover:text-gray-500' href="#">Home</a>
            </li>
            <li>
              <a className='hover:text-gray-500' href="#">Chat</a>
            </li>
            <li>
              <a onClick={handleSearchFriend} className='hover:text-gray-500' href="#">Find someone</a>
            </li>
            <li>
              <a className='hover:text-gray-500' href="#">Something</a>
            </li>
            <li>
              <a className='hover:text-gray-500' href="#">Log out</a>
            </li>
          </ul>
        </div>
        <div className='flex items-center gap-6'>
          <button className='bg-[#a6c1ee] text-white my-2 px-5 py-2 rounded  hover:bg-[#87acec] '>Sign in</button>
          <div className='md:hidden cursor-pointer'>

          {showMenu ? (
            <Icon.X onClick={toggleMenu} />
            ) : (
              <Icon.Menu onClick={toggleMenu} />
              )}
              </div>
        </div>
      </nav>
    </header>
  )
}
