import React from 'react'
import axios from 'axios';

export const EditProfil = () => {
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
            await axios.post('http://localhost:3001/users/editProfil',  formData);

            // Optionally, show a success message to the user
            alert('Profile updated successfully!');
        } catch (error) {
            // Handle any errors that may occur during the form submission
            console.error('Error updating profile:', error);
            // Show an error message to the user
        }
    };
    return (
        <div className="h-full bg-indigo-100 flex justify-center  ">
            <div className="lg:w-2/5 md:w-1/2 w-2/3">

                {/* <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg min-w-full"> */}
                <form onSubmit={handleFormSubmit} className="bg-white p-10 flex flex-row justify-between rounded-lg shadow-lg min-w-full  space-x-4">
                    {/* <h1 className="text-3xl font-semibold text-center text-gray-700">Sign up</h1> */}
                    <div className='flex flex-col space-y-4'>
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
                        </div>
                        <label className="label">
                            <span className="text-base label-text">gender</span>
                        </label>
                        <input name="gender" type="text" placeholder="gender" className="w-full input input-bordered" />
                        <div>
                            <button type='submit' className="btn btn-block">Save</button>
                        </div>
                  
                    </div>


                    <div className='flex flex-col space-y-4'>
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
                            <input name="avatar" className="w-full input input-bordered" type="file"   />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
