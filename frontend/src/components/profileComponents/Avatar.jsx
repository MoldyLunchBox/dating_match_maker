import React from 'react'

export const Avatar = () => {
    return (
        <div className="bg-gray-200 flex items-center justify-center bg-cover bg-[url('/public/images/prof.png')] relative p-4 text-center">
            <div className="custom-shape-divider-bottom-1693517643">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" class="shape-fill"></path>
                </svg>
            </div>
            <img class="z-10 w-full shadow border-8  h-full max-w-[200px] rounded-full" src="/images/avatar.jpg" alt="Rounded avatar" />

        </div>
    )
}
