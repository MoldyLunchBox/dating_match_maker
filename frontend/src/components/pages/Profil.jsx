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


          <div className="bg-gray-200 flex items-center justify-center bg-cover bg-[url('/public/images/prof.png')] relative p-4 text-center">
            <div className="custom-shape-divider-bottom-1693517643">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" class="shape-fill"></path>
              </svg>
            </div>
            <img class="z-10 w-full shadow border-8  h-full max-w-[200px] rounded-full" src="/images/avatar.jpg" alt="Rounded avatar" />
           
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
