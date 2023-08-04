import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';

export const EditProfil = () => {
    const [me, setMe] = useState(null)
    useEffect(() => {
        const fetchMe = async () => {

            try {

                const res = await axios.get('http://localhost:3001/users/me', { withCredentials: true });
                if (res.data.msg)
                    setMe(res.data.msg)
                else if (res.data.error)
                console.log(res.data.error)

            } catch (err) {
                console.log("error", err)
            }
        }
        if (!me)
        fetchMe()
        console.log(me)
    },[me])
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const form = e.target
            // Create a FormData object to send the profile data and picture
            const formData = new FormData();
            formData.append('fname', form.fname.value);
            formData.append('lname', form.lname.value);
            formData.append('email', form.email.value);
            formData.append('gender', form.gender.value);
            formData.append('username', form.username.value);
            formData.append('avatar', form.avatar.files[0]);
            console.log(formData)
            // Send the form data to the backend
            await axios.post('http://localhost:3001/users/editProfil', formData);

            // Optionally, show a success message to the user
            alert('Profile updated successfully!');
        } catch (error) {
            // Handle any errors that may occur during the form submission
            console.error('Error updating profile:', error);
            // Show an error message to the user
        }
    };
    return (
        <div className="h-full flex justify-center  ">
            <div className="lg:w-2/5 md:w-1/2 w-full">

                {/* <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg min-w-full"> */}
                <form onSubmit={handleFormSubmit} className=" max-width-[1000px] w-[90vh] bg-white flex flex-col rounded-lg shadow-lg min-w-full">
                    <h1 className="text-3xl font-semibold   bg-gradient-to-t from-[white] to-[#fbc2eb] py-5 text-center text-gray-700">Edit profil</h1>
                    <div className='px-10 pb-10'>
                        <div className=' flex flex-row justify-between space-x-4'>
                            <div className='flex w-full flex-col space-y-4'>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Username</span>
                                    </label>
                                    <input name="username" type="text" placeholder={me ? me.username : "Username"} className="w-full input input-bordered" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">First name</span>
                                    </label>
                                    <input name="fname" type="text" placeholder={me ? me.fname : "First name"} className="w-full input input-bordered" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Last name</span>
                                    </label>
                                    <input name="lname" type="text" placeholder={me ? me.lname : "Last name"} className="w-full input input-bordered" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Email</span>
                                    </label>
                                    <input name="email" type="text" placeholder={me ? me.email : "Email"}  className="w-full input input-bordered" />
                                </div>
                                <div>
                                </div>
                                <label className="label">
                                    <span className="text-base label-text">gender</span>
                                </label>
                                <input name="gender" type="text" placeholder={me ? me.gender : "Gender"} className="w-full input input-bordered" />
                            </div>

                            <div className='flex w-full flex-col space-y-4'>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Password</span>
                                    </label>
                                    <input name="password" type="password" placeholder="Enter Password"
                                        className="w-full input input-bordered" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Confirm Password</span>
                                    </label>
                                    <input type="password" placeholder="Confirm Password"
                                        className="w-full input input-bordered" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Profile Picture:</span>
                                    </label>
                                    <input name="avatar" className="w-full input input-bordered" type="file" />
                                </div>
                            </div>

                        </div>
                        <div>
                            <button type='submit' className="btn btn-block">Save</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
