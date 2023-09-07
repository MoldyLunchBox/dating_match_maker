import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedConversation } from '../redux/reducers/slicer';
import { useNavigate } from "react-router-dom";


export const UserSearchBadge = ({ status, avatar, fname, lname, username, id, socket }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();


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
    const handleChat = async (user) => {
        console.log("im sending this id", id)
        try {
            const response = await axios.post('http://localhost:3001/users/getConversationId', {
                user_id: id,
            }, { withCredentials: true });
            if (response && response.data && response.data.msg) {

                dispatch(setSelectedConversation(response.data.msg))
                navigate("/chat");
            }
        } catch (error) {
            console.error('failed:', error);
        }
    }
    return (
        <div className='bg-[#F2F2F2]  w-full border-2 border-white sm:max-w-[50%]  md:max-w-[33%]  p-2 flex flex-row  sm:flex-col'>
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
            <div onClick={status == "accept" || !status ? () => handleAdd(username) : status == "chat" ? () => handleChat(username) : null} className='flex border-2 h-full justify-center w-10 sm:w-full md:mt-2 min-w-[20px] hover:bg-[#e5e7eb] cursor-pointer items-center'>
                {status ? status : "add"}

            </div>
        </div>
    )
}
