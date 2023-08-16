import React, { useEffect, useState } from 'react'
import { X } from 'react-feather';
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFriend } from '../redux/reducers/slicer';
import { SearchFriends } from '../modals/SearchFriends';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch()
  const closemodal = () => {
    dispatch(setSearchFriend(false))
  }
  const toggleMenu = () => {
    const navLinks = document.querySelector('.nav-links')
    navLinks.classList.toggle('top-[9%]')
    setShowMenu(!showMenu);
  };

  const modalOpen = useSelector((state) => state.modals.searchFriend)
  const toggleModal = () => {
    dispatch(setSearchFriend(false))
  }
  return (
    <>
      <header className='bg-white'>
        <nav className='flex justify-between mx-auto items-center w-[92%]'>
          <div>
            profil pic
          </div>
          <div className='nav-links duration-500 md:static absolute bg-white md:min-h-fit  min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5'>

            <ul className='flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8'>
              <li>
                <Link to="/home" className="hover:text-gray-500">Home</Link>
              </li>
              <li>
                <Link to="/chat" className="hover:text-gray-500">Chat</Link>
              </li>
              <li>
                <Link to="/friends" className="hover:text-gray-500">Find someone</Link>
              </li>
              <li>
                <Link to="/match" className="hover:text-gray-500">Match maker</Link>
              </li>
              <li>
                <Link to="/logout" className="hover:text-gray-500">Log out</Link>
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
      {/* <SearchFriends isOpen={true} onClose={toggleModal} /> */}

    </>
  )
}
