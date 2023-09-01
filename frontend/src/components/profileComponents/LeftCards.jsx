import React, { useState } from 'react';
import { LikeBar } from './LikeBar';
import { UserNameInfo } from './UserNameInfo';

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
                <UserNameInfo user={user}/>

                {/* secodn card */}

                <LikeBar user={user} />
                <div className="bg-white h-40 p-4 shadow-md rounded-md overflow-hidden">
                    {/* Card content for user info */}
                    {/* Replace with actual user info */}
                </div>
            </div>
        </div>
    );
};
