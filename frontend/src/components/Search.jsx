import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { UserSearchBadge } from '../badges/UserSearchBadge';

export const Search = () => {
    const [me, setMe] = useState(null)
    const [searchWord, setSearchWord] = useState("")
    const [userMatch, setUserMatch] = useState(null)
    // useEffect(() => {
    //     const fetchMe = async () => {

    //         try {

    //             const res = await axios.get('http://localhost:3001/users/me', { withCredentials: true });
    //             if (res.data.msg)
    //                 setMe(res.data.msg)
    //             else if (res.data.error)
    //             console.log(res.data.error)

    //         } catch (err) {
    //             console.log("error", err)
    //         }
    //     }
    //     if (!me)
    //     fetchMe()
    //     console.log(me)
    // },[me])
    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const form = e.target
    //         // Create a FormData object to send the profile data and picture
    //         const formData = new FormData();
    //         formData.append('fname', form.fname.value);
    //         formData.append('lname', form.lname.value);
    //         formData.append('email', form.email.value);
    //         formData.append('gender', form.gender.value);
    //         formData.append('username', form.username.value);
    //         formData.append('avatar', form.avatar.files[0]);
    //         console.log(formData)
    //         // Send the form data to the backend
    //         await axios.post('http://localhost:3001/users/editProfil', formData, { withCredentials: true });

    //         // Optionally, show a success message to the user
    //         alert('Profile updated successfully!');
    //     } catch (error) {
    //         // Handle any errors that may occur during the form submission
    //         console.error('Error updating profile:', error);
    //         // Show an error message to the user
    //     }
    // };
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            console.log("searching for", searchWord)
            const response = await axios.post('http://localhost:3001/users/searchUsers', {
                word: searchWord,
            });
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
                                            return <UserSearchBadge key={index} avatar={user.avatar} fname={user.fname} lname={user.lname} username={user.username} />
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
