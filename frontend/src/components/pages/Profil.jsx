import React from 'react'
import { Avatar } from '../profileComponents/Avatar'
import { LeftCards } from '../profileComponents/LeftCards'
import { Body } from '../profileComponents/Body'
import { useParams } from 'react-router-dom'

export const Profil = () => {
  const { username } = useParams();
  console.log(username)
  return (
    <div className='flex grow min-h-full gap-3  '>
      <div class="flex-none   ">

      </div>
      <div class="flex-auto md:max-w-[400px]  ">
        <div className='flex h-full flex-col'>
          {username }
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
