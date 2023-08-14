import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { UserSearchBadge } from '../badges/UserSearchBadge';

export const FriendsList = ({ tab }) => {

    const [friends, setFriends] = useState(null)

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                let res = null
                if (tab === "friends")
                    res = await axios.get('http://localhost:3001/users/Friends', { withCredentials: true });
                else if (tab === "requests")
                    res = await axios.get('http://localhost:3001/users/requests', { withCredentials: true });
                if (res && res.data.msg)
                    setFriends(res.data.msg)
                else if ( res && res.data.error)
                    console.log(res.data.error)
                else
                setFriends(null)
            } catch (err) {
                console.log("error", err)
            }
        }

        fetchFriends()
    }, [])


    // const test = [
    //     {
    //         fname: "yoo",
    //         lname: "bar",
    //         avatar: "yoo",
    //         username: "cookie12",
    //     },
    //     {
    //         fname: "yoo",
    //         lname: "bar",
    //         avatar: "yoo",
    //         username: "cookie12",
    //     },
    //     {
    //         fname: "yoo",
    //         lname: "bar",
    //         avatar: "yoo",
    //         username: "cookie12",
    //     },
    //     {
    //         fname: "yoo",
    //         lname: "bar",
    //         avatar: "yoo",
    //         username: "cookie12",
    //     }
    // ]
    return (
        <div className=' '>
            {
                friends ?
                    <div className='w-full mt-1 flex flex-wrap flex-row justify-start '>
                        {
                            friends.map((user, index) => {
                                return <UserSearchBadge status={user.status} key={index} id={user.id} avatar={user.avatar} fname={user.fname} lname={user.lname} username={user.username} />
                            })
                        }
                    </div>
                    : null
            }

        </div>

    )
}
