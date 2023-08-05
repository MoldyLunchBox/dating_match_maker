import React, { useEffect } from 'react'

export const UserSearchBadge = ({avatar, fname, lname, username}) => {
    useEffect(() =>{
        console.log("search", fname)
    }    
        )
return (
        <div className='w-1/3 min-w-[320px] flex  space-y-4 flex-col'>
            <div className='flex flex-row space-x-2'>
                <div className="h-24 w-24 rounded-full overflow-hidden">
                    <img
                        className="h-full w-full object-cover"
                        src="http://localhost:3001/uploads/defaultAvatar.jpg"
                        alt="avatar"
                    />
                </div>
                <div>
                <h1>{`${fname}`}</h1>
                    <h3>{`@${username}`}</h3>
                </div>
            </div>
<div className='flex border  justify-center items-center'>

            add
</div>
            </div>
    )
}
