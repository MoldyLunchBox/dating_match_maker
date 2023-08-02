import axios from 'axios';
import React from 'react'

export const Register = () => {
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
        <div className="h-full bg-indigo-100 flex justify-center items-center">
            <div className="lg:w-2/5 md:w-1/2 w-2/3">

                {/* <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg min-w-full"> */}
                <form onSubmit={handleFormSubmit} className="bg-white p-10 rounded-lg shadow-lg min-w-full space-y-4">
                    <h1 className="text-3xl font-semibold text-center text-gray-700">Sign up</h1>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input  name="username" type="text" placeholder="Username" className="w-full input input-bordered" />
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
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="Confirm Password"
                            className="w-full input input-bordered" />
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
