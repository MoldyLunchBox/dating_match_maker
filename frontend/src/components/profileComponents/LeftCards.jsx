import React, { useState } from 'react';
import { LikeBar } from './LikeBar';
import { UserNameInfo } from './UserNameInfo';
import { useSelector } from 'react-redux';

export const LeftCards = () => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const profile = useSelector((state) => state.profile.profile)

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleDislike = () => {
        setDislikes(dislikes + 1);
    };

    const user = {
        fname: "..",
        lname: "..",
        age: "..",
        gender: "..",
        username: "..",
       city: "..",
        country: ".." ,
        views: "..",
        likes: "..",
        dislikes:".." ,
    };
    return (
        <div className="bg-gray-100 flex-1 p-4">
            <div className="flex h-full max-h-[600px] flex-col gap-4">
                <UserNameInfo user={profile ? profile : user}/>

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
