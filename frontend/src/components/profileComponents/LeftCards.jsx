import React, { useState } from 'react';
import { MapPin, Eye, ThumbsUp, ThumbsDown } from 'react-feather';
import { LikeBar } from './LikeBar';

export const LeftCards = () => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleDislike = () => {
        setDislikes(dislikes + 1);
    };

    const user = {
        fname: "abdu",
        lname: "mya",
        age: 90,
        gender: "male",
        username: "real_abdu123",
        location: { city: "agadir", country: "morocco" },
        views: 125,
        likes: 40,
        dislikes: 20,
    };
    return (
        <div className="bg-gray-100 flex-1 p-4">
            <div className="flex h-full max-h-[600px] flex-col gap-4">
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
                                <MapPin className="w-4" /> {user.location.city}, {user.location.country}
                            </span>
                            <div className=" flex items-center  ">
                                <span className='f-lato font-semibold'>Gender: {user.gender}</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* secodn card */}

           <LikeBar user={user}/>
                <div className="bg-white h-40 p-4 shadow-md rounded-md overflow-hidden">
                    {/* Card content for user info */}
                    {/* Replace with actual user info */}
                </div>
            </div>
        </div>
    );
};
