import React from 'react'

export const Profil = () => {
  return (
    <div className='flex grow min-h-full gap-3 bg-red-300'>
      {/* <div class="flex-none  bg-[yellow]">
    01
  </div> */}
  <div class="flex-auto w-32 md:max-w-[600px] bg-[red]">
   <div className='flex h-full flex-col'>
   <div class="flex-auto h-14 bg-black">
    03
  </div>
  <div class="flex-auto h-64 bg-[yellow]">
    03
  </div>
   </div>
  </div>
  <div class="flex-auto w-64 bg-black hidden md:block">
    03
  </div>
    </div>
  )
}
