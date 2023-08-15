import React, { useState } from 'react'
import axios from 'axios';
import { UserSearchBadge } from '../../badges/UserSearchBadge';

export const Search = () => {
    const [searchWord, setSearchWord] = useState("")
    const [userMatch, setUserMatch] = useState(null)

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            console.log("searching for", searchWord)
            const response = await axios.post('http://localhost:3001/users/searchUsers', {
                word: searchWord,
            },{ withCredentials: true });
            const result = response.data.msg;
            if (result)
                setUserMatch(result)
            else
                setUserMatch(null)
            console.log(result);
        } catch (error) {
            console.error('Login failed:', error);
        }
    }
   
    return (
        <div className="h-full flex justify-center my-5 ">
            <div className=" lg:w-3/4 w-full">

                {/* <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg min-w-full"> */}
                <div className=" min-h-screen max-width-[1000px]   bg-white flex flex-col rounded-lg shadow-lg min-w-full">
                    <h1 className="text-3xl font-semibold   bg-gradient-to-t from-[white] to-[#fbc2eb] py-5 text-center text-gray-700">Find someone</h1>
                    <div className='px-10 pb-10 space-y-4'>
                        <form onSubmit={handleSearch} className='flex w-full justify-center flex-row  '>
                            <div className='flex w-full'>
                                <input onChange={(e) => setSearchWord(e.target.value)} className="flex w-full input input-bordered" name="search" type="text" placeholder="Search" />
                            </div>
                            <button type='submit' className=" w-1/3 btn btn-block">Search</button>
                        </form>
                        {
                            userMatch ?
                                <div className='w-full flex flex-wrap flex-row justify-start '>
                                    {
                                        userMatch.map((user, index) => {
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
