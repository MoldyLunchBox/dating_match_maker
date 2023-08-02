import React from 'react'

export const Register = () => {
  return (
    //   <div className="h-screen bg-indigo-100 flex justify-center items-center">
    //       <div className="lg:w-2/5 md:w-1/2 w-2/3">
    //           <h1 className="text-3xl font-semibold text-center text-gray-700">DaisyUI</h1>
    //           <form className="space-y-4">
    //               <div>
    //                   <label className="label">
    //                       <span className="text-base label-text">Name</span>
    //                   </label>
    //                   <input type="text" placeholder="Name" className="w-full input input-bordered" />
    //               </div>
    //               <div>
    //                   <label className="label">
    //                       <span className="text-base label-text">Email</span>
    //                   </label>
    //                   <input type="text" placeholder="Email Address" className="w-full input input-bordered" />
    //               </div>
    //               <div>
    //                   <label className="label">
    //                       <span className="text-base label-text">Password</span>
    //                   </label>
    //                   <input type="password" placeholder="Enter Password"
    //                       className="w-full input input-bordered" />
    //               </div>
    //               <div>
    //                   <label className="label">
    //                       <span className="text-base label-text">Confirm Password</span>
    //                   </label>
    //                   <input type="password" placeholder="Confirm Password"
    //                       className="w-full input input-bordered" />
    //               </div>
    //               <div>
    //                   <button className="btn btn-block">Sign Up</button>
    //               </div>
    //               <span>Already have an account ?
    //                   <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">Login</a></span>
    //           </form>
    //       </div>
    //   </div>
      <div className="h-full bg-indigo-100 flex justify-center items-center">
          <div className="lg:w-2/5 md:w-1/2 w-2/3">

              {/* <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg min-w-full"> */}
              <form className="bg-white p-10 rounded-lg shadow-lg min-w-full space-y-4">
          <h1 className="text-3xl font-semibold text-center text-gray-700">Sign up</h1>
                      <div>
                          <label className="label">
                              <span className="text-base label-text">Username</span>
                          </label>
                          <input type="text" placeholder="Username" className="w-full input input-bordered" />
                      </div>
                  <div>
                      <label className="label">
                          <span className="text-base label-text">First name</span>
                      </label>
                      <input type="text" placeholder="First name" className="w-full input input-bordered" />
                  </div>
                  <div>
                      <label className="label">
                          <span className="text-base label-text">Last name</span>
                      </label>
                      <input type="text" placeholder="Last name" className="w-full input input-bordered" />
                  </div>
                      <div>
                          <label className="label">
                              <span className="text-base label-text">Email</span>
                          </label>
                          <input type="text" placeholder="Email Address" className="w-full input input-bordered" />
                      </div>
                      <div>
                          <label className="label">
                              <span className="text-base label-text">Password</span>
                          </label>
                          <input type="password" placeholder="Enter Password"
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
                          <button className="btn btn-block">Sign Up</button>
                      </div>
                      <span>Already have an account ?
                          <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">Login</a></span>
                  </form>
          </div>
      </div>
  )
}
