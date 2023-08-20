import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Menu, ChevronDown } from 'react-feather';

export const Register = () => {
    const [categories, setCategories] = useState(null)
    const [pickedCategory, setPickedCategory] = useState(null)
    const [selectedInterests, setSelectedInterests] = useState([]);

    useEffect(() => {
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
    }, [])
    const handleInterestToggle = (interest) => {
        const checked = selectedInterests.includes(interest)
        if (checked)
            setSelectedInterests((prev) => (prev.filter(item => item !== interest)))
        else
            setSelectedInterests((prev) => ([...prev, interest]))

    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        try {
            const response = await axios.post('http://localhost:3001/users/register', {
                username: form.elements.username.value,
                password: form.elements.password.value,
                fname: form.elements.fname.value,
                lname: form.elements.lname.value,
                gender: form.elements.gender.value,
                email: form.elements.email.value,
                interests: selectedInterests
            });
            if (response.data && !response.data.error) {
                const msg = response.data.msg;
                // store the token in localStorage for further use
                console.log(msg)
            }
            else
                console.log(response.data.error)
        } catch (error) {
            console.error('registration failed:', error);
        }
    }
    return (
        <div className="min-h-screen  bg-indigo-100 flex justify-center items-center">
            <div className="container my-5  max-w-[600px]">

                {/* <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg min-w-full"> */}
                <form onSubmit={handleFormSubmit} className="bg-white p-10 rounded-lg shadow-lg  h-full space-y-5">
                    <h1 className="text-3xl font-semibold text-center text-gray-700">Sign up</h1>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input name="username" type="text" placeholder="Username" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">First name</span>
                        </label>
                        <input name="fname" type="text" placeholder="First name" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Last name</span>
                        </label>
                        <input name="lname" type="text" placeholder="Last name" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input name="email" type="text" placeholder="Email Address" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">gender</span>
                        </label>
                        <input name="gender" type="text" placeholder="gender" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input name="password" type="password" placeholder="Enter Password"
                            className="w-full input input-bordered" />
                    </div>
                    <div className='mb-4'>
                        <label className="label">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="Confirm Password"
                            className="w-full input input-bordered" />
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
                    <div>
                        <button type='submit' className="btn btn-block">Sign Up</button>
                    </div>
                    <span>Already have an account ?
                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">Login</a></span>
                </form>
            </div>
        </div>
    )
}
