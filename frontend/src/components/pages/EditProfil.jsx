import React, { useState } from 'react'
import axios from 'axios';
import { ChevronDown } from 'react-feather';
import { useEffect } from 'react';

export const EditProfil = () => {
    const [me, setMe] = useState(null)
    const [categories, setCategories] = useState(null)
    const [pickedCategory, setPickedCategory] = useState(null)
    const [selectedInterests, setSelectedInterests] = useState([]);

    useEffect(() => {
     
    }, [])
    const handleInterestToggle = (interest) => {
        const checked = selectedInterests.includes(interest)
        if (checked)
            setSelectedInterests((prev) => (prev.filter(item => item !== interest)))
        else
            setSelectedInterests((prev) => ([...prev, interest]))

    }


    useEffect(() => {
        const fetchMe = async () => {
            try {
                const fetchInterests = async () => {
                    try {
                        const response = await axios.get('http://localhost:3001/api/interests');
                        if (response && response.data.categories) {
                            setCategories(response.data.categories)
                        }
                    } catch (err) {
                        console.log("error fetching interests")
                    }
                }
                fetchInterests()
                const res = await axios.get('http://localhost:3001/users/me', { withCredentials: true });
                if (res.data.msg){
                    setSelectedInterests(res.data.interests)
                    setMe(res.data.msg)
                }
                    else if (res.data.error)
                    console.log(res.data.error)

            } catch (err) {
                console.log("error", err)
            }
        }
        if (!me)
            fetchMe()
        console.log(me)
    }, [me])
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
            formData.append('interests', selectedInterests);
            console.log(formData)
            // Send the form data to the backend
            await axios.post('http://localhost:3001/users/editProfil', formData, { withCredentials: true });

            // Optionally, show a success message to the user
            alert('Profile updated successfully!');
        } catch (error) {
            // Handle any errors that may occur during the form submission
            console.error('Error updating profile:', error);
            // Show an error message to the user
        }
    };
    return (
        <div className="h-full flex justify-center   max-width-[600px]">
            <div className="lg:w-3/4 md:w-1/2 max-width-[600px]">
                {/* <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg min-w-full"> */}
                <form onSubmit={handleFormSubmit} className=" max-width-[600px] bg-white flex flex-col rounded-lg shadow-lg">
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
                                    <input name="email" type="text" placeholder={me ? me.email : "Email"} className="w-full input input-bordered" />
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
                                        <span className="text-base label-text">Profile Picture:</span>
                                    </label>
                                    <input name="avatar" className="w-full input input-bordered" type="file" />
                                </div>
                                <div className='relative '>
                                    <label className="   bg-white label">
                                        <span className="text-base label-text"></span>
                                    </label>
                                    <label className="absolute -top-2 left-[0px] bg-white label">
                                        <span className="text-base label-text">Interests</span>
                                    </label>
                                    {/* <div className='w-full flex justify-center items-center flex-col'>
                            <div className='flex flex-row items-center space-x-2 py-2 px-3 rounded bg-gray-300'>
                                <div>Interests</div>
                                <Menu />
                            </div>
                        </div> */}

                                    <div className='p-2 border py-5'>
                                        <ul className='  text-start'>
                                            <li className=' flex flex-col space-y-2 '>
                                                {categories ?
                                                    categories.map((category, index) => (
                                                        <div key={index} onClick={() => setPickedCategory(category.id)}>
                                                            <span className='text-xl p-1 flex items-center justify-between cursor-pointer rounded-t border-[#6C22F0] border-b-2 w-full bg-[#E0E0E0] hover:shadow-md hover:translat hover:duration-300'>

                                                                {category.name}
                                                                <div><ChevronDown /></div>
                                                            </span>
                                                            {
                                                                pickedCategory == category.id ?
                                                                    <ul className='transition-all  ease-in-out '>
                                                                        {
                                                                            category.interests.map((interest, index) => (
                                                                                <li key={index} onClick={() => handleInterestToggle(interest)} className='cursor-pointer items-center flex space-y-1 space-x-1'>
                                                                                    <input checked={selectedInterests.includes(interest)}

                                                                                        type="checkbox" className="checkbox" />
                                                                                    <div>
                                                                                        {interest}
                                                                                    </div>
                                                                                </li>
                                                                            ))
                                                                        }
                                                                    </ul>
                                                                    : null
                                                            }
                                                        </div>
                                                    )) : null
                                                }
                                            </li>
                                        </ul>
                                    </div>

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
