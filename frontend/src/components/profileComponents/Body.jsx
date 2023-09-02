import React from 'react'
import {   ChevronDown, ChevronUp } from 'react-feather';

export const Body = () => {
    const interests = [
        { name: "sports" },
        { name: "music" },
        { name: "gaming" },
    ]
    return (
        <div class="flex-auto p-10 bg-white   hidden md:flex">
            <div className='bg-[#fafafa]   w-full   mytest  p-10 flex justify-center'>
                <div className='flex w-full h-1/2 gap-10 flex-col'>
                    <div className='flex flex-row gap-4  justify-between'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-1'>
                                <span className='bg-blue-300 f-montserrat font-semibold rounded-l py-2 px-3 '>nickname</span>
                                <span className=''>Buger breath</span>
                            </div>
                            <div className='flex items-center gap-1'>
                                <span className='bg-blue-300 f-montserrat font-semibold rounded-l py-2 px-3 '>Job</span>
                                <span className=''>Web Dev</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 '>
                            {
                                interests.map((interest) => (
                                    <div className='flex flex-row bg-blue-300 justify-between f-montserrat font-semibold rounded-t py-2 px-3 w-[200px]'>

                                    {interest.name} 
                                    <ChevronDown className='cursor-pointer'/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='h-1/2 shadow min-h-[300px] p-5 bg-gray-200'>asas</div>
                </div>
            </div>
        </div>
    )
}
