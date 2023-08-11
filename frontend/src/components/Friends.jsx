import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { UserSearchBadge } from '../badges/UserSearchBadge';

export const Friends = () => {

  const [friends, setFriends] = useState(null)

    useEffect(() => {
        const fetchFriends = async () => {
            try {

                const res = await axios.get('http://localhost:3001/users/Friends', { withCredentials: true });
                if (res.data.msg)
                setFriends(res.data.msg)
                else if (res.data.error)
                console.log(res.data.error)
              console.log("friends",res.data.msg)
            } catch (err) {
                console.log("error", err)
            }
        }

        fetchFriends()
    },[])


    const test = [
        {
            fname: "yoo",
            lname: "bar",
            avatar: "yoo",
            username: "cookie12",
        },
        {
            fname: "yoo",
            lname: "bar",
            avatar: "yoo",
            username: "cookie12",
        },
        {
            fname: "yoo",
            lname: "bar",
            avatar: "yoo",
            username: "cookie12",
        },
        {
            fname: "yoo",
            lname: "bar",
            avatar: "yoo",
            username: "cookie12",
        }
    ]
    return (
        <div className="h-full flex justify-center my-5 ">
            <div className=" lg:w-3/4 w-full">

                {/* <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg min-w-full"> */}
                <div className=" min-h-screen max-width-[1000px]   bg-white flex flex-col rounded-lg shadow-lg min-w-full">
                    <h1 className="text-3xl font-semibold   bg-gradient-to-t from-[white] to-[#fbc2eb] py-5 text-center text-gray-700">Find someone</h1>
                    <div className='px-10 pb-10 space-y-4'>
                    
                        {
                            friends ?
                                <div className='w-full flex flex-wrap flex-row justify-start '>
                                    {
                                        friends.map((user, index) => {
                                            return <UserSearchBadge status={user.status} key={index} id={user.id} avatar={user.avatar} fname={user.fname} lname={user.lname} username={user.username} />
                                        })
                                    }
                                </div>
                            : null
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}
