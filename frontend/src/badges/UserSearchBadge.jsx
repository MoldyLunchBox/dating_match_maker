import React, { useEffect } from 'react'

export const UserSearchBadge = ({ avatar, fname, lname, username }) => {
    useEffect(() => {
        console.log("search", fname)
    }
    )
    return (
        <div className='bg-[#F2F2F2] border w-full border-2 border-white sm:max-w-[50%]  md:max-w-[33%]  p-2 flex flex-row  sm:flex-col'>
            <div className='flex w-full flex-row flex-grow'>
                <div className="h-24 w-24 rounded-full  overflow-hidden mr-4">
                    <img
                        className="h-full w-full object-cover"
                        src={avatar}
                        alt="avatar"
                    />
                </div>
                <div>
                    <h1>{`${fname}`}</h1>
                    <h3>{`@${username}`}</h3>
                </div>
            </div>
            <div className='flex border-2 h-full justify-center w-10 sm:w-full md:mt-2 min-w-[20px] hover:bg-[#e5e7eb] cursor-pointer items-center'>
                add
            </div>
        </div>
    )
}
