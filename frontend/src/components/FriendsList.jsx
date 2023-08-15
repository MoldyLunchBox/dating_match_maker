import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { UserSearchBadge } from '../badges/UserSearchBadge';

export const FriendsList = ({ tab }) => {

    const [friends, setFriends] = useState(null)
    const [searchWord, setSearchWord] = useState("")

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/users/searchUsers', {
                word: searchWord,
            }, { withCredentials: true });
            const result = response.data.msg;
            if (result)
                setFriends(result)
            else
                setFriends(null)
            console.log(result);
        } catch (error) {
            console.error('Login failed:', error);
        }
    }
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
                else if (res && res.data.error)
                    console.log(res.data.error)
                else
                    setFriends(null)
            } catch (err) {
                console.log("error", err)
            }
        }
        
        fetchFriends()
    }, [tab])
    useEffect(()=>{
        
    })
    console.log("searching for", friends)

    return (
        <div className=' '>
            {
                tab === "search" ?
                    <form onSubmit={handleSearch} className='flex mt-2 w-full justify-center flex-row  '>
                        <div className='flex w-full'>
                            <input onChange={(e) => setSearchWord(e.target.value)} className="flex w-full input input-bordered" name="search" type="text" placeholder="Search" />
                        </div>
                        <button type='submit' className=" w-1/3 btn btn-block">Search</button>
                    </form>
                    : null
            }
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
