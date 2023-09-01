import React from 'react'
import { Avatar } from '../profileComponents/Avatar'
import { LeftCards } from '../profileComponents/LeftCards'

export const Profil = () => {
  return (
    <div className='flex grow min-h-full gap-3 bg-red-300'>
      {/* <div class="flex-none  bg-[yellow]">
    01
  </div> */}
      <div class="flex-auto md:max-w-[400px] bg-[red]">
        <div className='flex h-full flex-col'>
          {/* Profile Picture */}
          <Avatar />
          {/* User Info Cards */}
          <LeftCards />
        </div>
      </div>
      <div class="flex-auto  bg-black hidden md:block">
        03
      </div>
    </div>
  )
}
