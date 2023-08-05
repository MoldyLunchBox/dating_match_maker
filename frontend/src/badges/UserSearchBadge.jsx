import React, { useEffect } from 'react'

export const UserSearchBadge = ({ avatar, fname, lname, username }) => {
    useEffect(() => {
        console.log("search", fname)
    }
    )
    return (
        <div className='bg-[#F2F2F2] w-full border-2 border-white sm:max-w-[50%]  md:max-w-[33%]  p-2 flex flex-row  sm:flex-col'>
            <div className='flex w-full flex-row flex-grow'>
                <div className="h-24 w-24 rounded-full  overflow-hidden mr-4">
                    <img
                        className="h-full w-full object-cover"
                        src="https://img.freepik.com/free-photo/confident-attractive-caucasian-guy-beige-pullon-smiling-broadly-while-standing-against-gray_176420-44508.jpg?w=740&t=st=1691252871~exp=1691253471~hmac=e2c0a5ab29aa1f05ef716c0d3414d827159d699e2843ed03e9a527a19efd5cc7"
                        alt="avatar"
                    />
                </div>
                <div>
                    <h1>{`${fname}`}</h1>
                    <h3>{`@${username}`}</h3>
                </div>
            </div>
            <div className='flex border h-full justify-center md:mt-2 items-center'>
                add
            </div>
        </div>
    )
}
