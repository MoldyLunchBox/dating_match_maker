import React from 'react'
import {   ThumbsUp, ThumbsDown } from 'react-feather';

export const LikeBar = ({user}) => {
  return (
    <div className="bg-white h-40 p-4 shadow-md rounded-md overflow-hidden flex items-center">

    <div className="flex w-full justify-center flex-col gap-8">
        <div className='flex  justify-center flex-row gap-5'>
            <div className='text-center flex gap-1 items-center'> <div className='bg-green-100 px-3 cursor-pointer rounded-lg py-2 hover:bg-green-400' ><ThumbsUp /></div> {user.likes}</div>
            <div className='text-center flex gap-1 items-center'><div className='bg-red-100 px-3 cursor-pointer rounded-lg py-2 hover:bg-red-400' ><ThumbsDown/></div>  {user.dislikes}</div>
        </div>
        <div className="w-[250px] mx-auto bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
            <div className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500" style={{ width: "45%" }}></div>
        </div>

    </div>
</div>
  )
}
