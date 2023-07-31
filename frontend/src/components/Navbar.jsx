import React from 'react'

export const Navbar = () => {
  return (
    <header className='bg-white'>
      <nav className='flex  flex-col justify-between items-center w-[92%]'>
    <div >
      <ul className='flex items-center gap-[4vw]'>
        <li>
          <a className='hover:text-gray-500' href="#">Home</a>
        </li>
        <li>
          <a className='hover:text-gray-500' href="#">Chat</a>
        </li>
        <li>
          <a className='hover:text-gray-500' href="#">Find someone</a>
        </li>
        <li>
          <a className='hover:text-gray-500' href="#">Something</a>
        </li>
        <li>
          <a className='hover:text-gray-500' href="#">Log out</a>
        </li>
        <button className='bg-[#a6c1ee] text-white  px-5 py-2 rounded  hover:bg-[#87acec] '>Sign in</button>
      </ul>
      <div className=''>
      </div>
    </div>
      </nav>
    </header>
  )
}
