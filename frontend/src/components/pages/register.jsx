import axios from 'axios';
import React, { useState } from 'react'
import { Menu, ChevronDown } from 'react-feather';

export const Register = () => {
    const [categories, setCategories] = useState([
        ['Sports and Fitness'],
        ['Arts and Crafts'],
        ['Music'],
        ['Food and Cooking'],
        ['Gaming'],
        ['Travel and Adventure'],
        ['Technology and Coding'],
        ['Health and Wellness'],
        ['Literature and Writing'],
        ['Science and Nature'],
    ])

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
                email: form.elements.email.value
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
                                    {
                                        categories.map((category, index) => (
                                            <>
                                                <span className='text-xl p-1 flex items-center justify-between cursor-pointer rounded-t border-[#6C22F0] border-b-2 w-full bg-[#E0E0E0] hover:shadow-md hover:translat hover:duration-300'> 
                                                
                                                {category} 
                                                <div><ChevronDown/></div>
                                                </span>
                                                <ul>

                                                </ul>
                                            </>
                                        ))
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
