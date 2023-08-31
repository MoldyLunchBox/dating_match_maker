import React from 'react'

export const Profil = () => {
  return (
    <div className='flex grow min-h-full gap-3 bg-red-300'>
      {/* <div class="flex-none  bg-[yellow]">
    01
  </div> */}
  <div class="flex-auto w-32 md:max-w-[600px] bg-[red]">
   <div className='flex h-full flex-col'>
 {/* Profile Picture */}
 <defs>
  <pattern id="img1" patternUnits="userSpaceOnUse" width="100" height="100">
    <image href="/public/logo192.png" x="0" y="0" width="100" height="100" />
  </pattern>
</defs>

 <div className="bg-gray-200 relative p-4 text-center">
 <div class="custom-shape-divider-top-1693453063 ">
    <svg className="" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">

        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" class="fill-url('/public/logo192.png') "></path>
    </svg>
</div>
        <img
          src="profile-image.jpg"
          alt="Profile"
          className="mx-auto rounded-full w-24 h-24"
        />
        <h2 className="text-lg font-semibold mt-2">Username</h2>
      </div>

      {/* User Info Cards */}
      <div className="bg-gray-100 flex-1 p-4">
        <div className="flex h-full max-h-[600px] flex-col   gap-4">
          <div className="bg-white flex-auto h-30 p-4 shadow-md rounded-md">
            {/* Card content for user info */}
            {/* Replace with actual user info */}
          </div>
          <div className="bg-white flex-auto h-30 p-4 shadow-md rounded-md">
            {/* Card content for user info */}
            {/* Replace with actual user info */}
          </div>
          <div className="bg-white flex-auto h-30 p-4 shadow-md rounded-md">
            {/* Card content for user info */}
            {/* Replace with actual user info */}
          </div>
        </div>
      </div>
   </div>
  </div>
  <div class="flex-auto w-64 bg-black hidden md:block">
    03
  </div>
    </div>
  )
}
