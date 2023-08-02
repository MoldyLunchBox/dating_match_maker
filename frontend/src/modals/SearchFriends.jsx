import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export const SearchFriends = ({ isOpen, onClose }) => {
    const [searchWord, setSearchWord] = useState("")
    const handleSearch =async (e)=>{
        e.preventDefault();
        try {
            console.log("searching for", searchWord)
            const response = await axios.post('http://localhost:3001/users/searchUsers', {
                word: searchWord,
            });
            const res = response.data;
            console.log(res);
        } catch (error) {
            console.error('Login failed:', error);
        }
    }
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-800 bg-opacity-75 absolute inset-0" onClick={onClose}></div>
            <div className="bg-white p-4 rounded-lg shadow-xl z-50">
                <h2 className="text-xl font-bold mb-4">Modal Content</h2>
                <p>This is the content of the modal.</p>
                <input type="text" onChange={(e) => setSearchWord(e.target.value)} />
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
                    onClick={handleSearch}
                >
                    search
                </button>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};
