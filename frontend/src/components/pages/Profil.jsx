import React from 'react'
import { Avatar } from '../profileComponents/Avatar'
import { LeftCards } from '../profileComponents/LeftCards'

export const Profil = () => {
  return (
    <div className='flex grow min-h-full gap-3  '>
      <div class="flex-none   ">
    
  </div>
      <div class="flex-auto md:max-w-[400px]  ">
        <div className='flex h-full flex-col'>
          {/* Profile Picture */}
          <Avatar />
          {/* User Info Cards */}
          <LeftCards />
        </div>
      </div>
      <div class="flex-auto p-10 bg-white justify-center  items-center hidden md:flex">
        <div className='bg-[#fafafa] border w-full h-full border-[orange] p-10 flex items-center justify-center'>
          <div className='flex w-full flex-col'>
            <div className='flex flex-row gap-4  justify-between'>
              <div className='flex flex-col'>
                <span>job</span>
                <span>job</span>
              </div>
              <div className='flex flex-col'>
                <span>interest</span>
                <span>interest</span>
                <span>interest</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
