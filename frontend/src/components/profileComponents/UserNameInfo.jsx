import React from 'react'
import { MapPin, Eye } from 'react-feather';

export const UserNameInfo = ({user}) => {
    return (
        <div className="bg-white h-40 p-4 shadow-md rounded-md overflow-hidden flex items-center">
            <div className="flex flex-col gap-2">
                <div className='flex flex-row'>
                    <span className=" w-60 f-montserrat uppercase font-semibold text-2xl">
                        {user.lname} {user.fname}
                    </span>
                    <div className=" f-lato flex items-center  ">
                        <span className='f-lato font-semibold flex gap-1'><Eye color='green' className='w-5' /> {user.views}</span>
                    </div>
                </div>
                <div className='flex flex-row'>
                    <span className="w-60  f-lato font-semibold text-lg">@{user.username}</span>
                    <div className=" f-lato flex items-center  ">
                        <span className='f-lato font-semibold'>Age: {user.age}</span>
                    </div>
                </div>
                <div className='flex flex-row'>
                    <span className="w-60 f-lato capitalize flex items-center gap-1 font-semibold text-lg">
                        <MapPin className="w-4" /> {user.city}, {user.country}
                    </span>
                    <div className=" flex items-center  ">
                        <span className='f-lato font-semibold'>Gender: {user.gender}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
