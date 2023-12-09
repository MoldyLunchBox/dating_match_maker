import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Menu, ChevronDown } from 'react-feather';
import { UploadPicture } from '../UploadPicture';
import { errorIndicator, fieldChecker } from '../../utils/register';
import { Loading } from '../../modals/Loading';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRegistered } from '../../redux/reducers/slicer';
import TextField from '@mui/material/TextField';

export const Register = () => {
    const [categories, setCategories] = useState(null)
    const [pickedCategory, setPickedCategory] = useState(null)
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [loading, setLoading] = useState(null)
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate();

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

    useEffect(() => {
        console.log("selected intersts ", selectedInterests)
    }, [selectedInterests])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const form = e.target
            const formData = new FormData();
            formData.append('username', form.username.value);
            formData.append('fname', form.fname.value);
            formData.append('password', form.password.value);
            formData.append('lname', form.lname.value);
            formData.append('email', form.email.value);
            formData.append('gender', form.gender.value);
            formData.append('avatar', form.avatar.files[0]);
            formData.append('interests', selectedInterests);
            const badFieldDiv = document.getElementById("missingFieldError")
            if (selectedInterests && file) {
                const response = await axios.post('http://localhost:3001/users/register',
                    formData
                );
                if (response.data && !response.data.error) {
                    const msg = response.data.msg;
                    console.log("all is good we registered?")
                    dispatch(setRegistered(true))
                    navigate("/");
                }
                else {
                    errorIndicator(response.data.error, setLoading)
                    console.log("error?", response.data.error)
                }
            }
            else {
                errorIndicator("* all fields are required")
                console.log("eror missing fields")

            }
        } catch (error) {
            console.error('registration failed:', error);
            errorIndicator("registration failed")
        }
    }
    const fieldHandler = (e) => {
        fieldChecker(e.target.name, e.target.value)
    }
    return (
        <div className="min-h-screen bg-indigo-100 flex justify-center items-center">
            {loading ? <Loading /> : null}
            <div className="container my-5 max-w-[600px]">
                {/* <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg min-w-full"> */}
                <form onSubmit={handleFormSubmit} className="bg-white p-10 rounded-lg shadow-lg  h-full space-y-5">
                    <h1 className="text-3xl font-semibold text-center text-gray-700">Sign up</h1>
                    <div className='flex justify-center'>
                        <UploadPicture file={file} setFile={setFile} />

                    </div>

                    <TextField
                        required name="username" id="username" onChange={fieldHandler} type="text" placeholder="Username" className="w-full input input-bordered"
                        // id="outlined-required"
                        label="Username"

                    />
                    <TextField
                        required name="fname" id="fname" type="text" onChange={fieldHandler} placeholder="First name" className="w-full   input input-bordered"
                        // id="outlined-required"
                        label="First Name"
                    />
                    <TextField
                        required name="lname" id="lname" onChange={fieldHandler} type="text" placeholder="Last name" className="w-full input input-bordered"
                        // id="outlined-required"
                        label="Last Name"
                    />
                    <TextField
                        required name="email" id="email" onChange={fieldHandler} type="text" placeholder="Email Address" className="w-full input input-bordered"
                        // id="outlined-required"
                        label="email"
                    />
                   
                    <div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <select required
                                className="mt-1 block w-full p-2 border rounded-md items-center shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                name="gender"
                                id="gender" onChange={fieldHandler}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input required name="password" type="password" placeholder="Enter Password"
                            className="w-full input input-bordered" />
                    </div>
                    <div className='mb-4'>
                        <label className="label">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>
                        <input required type="password" placeholder="Confirm Password"
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
                                                                        <input onChange={() => { }} checked={selectedInterests.includes(interest)}

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
                    {

                        <h1 id="missingFieldError" className='hidden text-red-400 '>* all fields must be filled.</h1>
                    }
                    <button type='submit' className="btn btn-block">Sign Up</button>

                    <span>Already have an account ?
                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">Login</a></span>
                </form>
            </div>
        </div>
    )
}
