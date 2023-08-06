import React, { useEffect } from 'react'
import axios from 'axios';

export const UserSearchBadge = ({ status, avatar, fname, lname, username , id}) => {
    const handleAdd = async (user) => {
        try {
            const response = await axios.post('http://localhost:3001/users/addFriend', {
                username: user,
            }, { withCredentials: true });
            const success = response.data.msg;
            if (success)
                console.log("friend request sent");

            else
                console.log("error");
        } catch (error) {
            console.error('failed:', error);
        }
    }
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
                    <h3>{id}</h3>
                </div>
            </div>
            <div onClick={status == "accept" || !status  ? ()=> handleAdd(username): null} className='flex border-2 h-full justify-center w-10 sm:w-full md:mt-2 min-w-[20px] hover:bg-[#e5e7eb] cursor-pointer items-center'>
                {status ? status : "add" }
                
            </div>
        </div>
    )
}
