import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { UserSearchBadge } from '../../badges/UserSearchBadge';
import { FriendsList } from '../FriendsList';

export const Friends = () => {
    const [tab, setTab] = useState("friends")

    return (
        <div className="h-full flex justify-center my-5 ">
            <div className=" lg:w-3/4 w-full">

                {/* <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg min-w-full"> */}
                <div className=" min-h-screen max-width-[1000px]   bg-white flex flex-col rounded-lg shadow-lg min-w-full">
                    {/* <h1 className="text-3xl font-semibold   bg-gradient-to-t from-[white] to-[#fbc2eb] py-5 text-center text-gray-700">Find someone</h1> */}
                    <div className=" px-10 text-xl font-semibold flex flex-row space-x-1 content-end bg-gradient-to-t from-[white] to-[#fbc2eb] pt-4  text-gray-700"> 
                    <div onClick={()=> setTab("friends")} className={`${tab == 'friends' ? "bg-[#fafafa]" : "bg-[#e4e4e7]"} w-fit p-2 rounded-t cursor-pointer`} >Friends</div>
                    <div onClick={()=> setTab("requests")} className={`${tab == 'requests' ? "bg-[#fafafa]" : "bg-[#e4e4e7]"} w-fit p-2 rounded-t cursor-pointer`}>Requests</div>
                    <div onClick={()=> setTab("search")} className={`${tab == 'search' ? "bg-[#fafafa]" : "bg-[#e4e4e7]"} w-fit p-2 rounded-t cursor-pointer`}>Search</div>
                    </div>
                    <div className='px-10 pb-10 space-y-4 h-[100vh] bg-[#fafafa] '>

                

                        <FriendsList tab={tab}/>
                     

                    </div>

                </div>
            </div>
        </div>
    )
}
