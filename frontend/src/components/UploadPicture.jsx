import React, { useRef, useState } from 'react'

export const UploadPicture = ({ file, setFile }) => {
  const inputRef = useRef(null)

  const handleInageClick = () => {
    inputRef.current.click()
  }
  const imagePreview = document.getElementById('image-preview');
  const handleImageChange = (e) => {
    console.log(e.target.files[0])
   const the_file = e.target.files[0]
    if (the_file) {
      const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (allowedFormats.includes(the_file.type) && the_file.size <= maxSize) {{}
        setFile(the_file)
      } else {
        setFile(null);
      }
    }

  }
  return (
    <div onClick={handleInageClick}>
      <div id="image-preview" className={`max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 ${file ? "border-green-400" : "border-red-400" }  rounded-lg items-center mx-auto text-center cursor-pointer`}>
        {
          file ?
            <img src={URL.createObjectURL(file)} className="max-h-48 rounded-lg mx-auto" alt="Image preview" />
            :
            <>
              {/* <input required id="upload" type="file" className="hidden" accept="image/jpeg,image/jpg,image/png" /> */}
              <label htmlFor="upload" className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-700 mx-auto mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">Upload picture</h5>
                <p className="font-normal text-sm text-gray-400 md:px-6">Choose photo size should be less than <b className="text-gray-600">2mb</b></p>
                <p className="font-normal text-sm text-gray-400 md:px-6">and should be in <b className="text-gray-600">JPG, JPEG, or PNG</b> format.</p>
                <span id="filename" className="text-gray-500 bg-gray-200 z-50"></span>
              </label>
            </>
        }
      </div>
      <div className="flex items-center justify-center">
        <div className="w-full">
          <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
            <span className="text-center ml-2">Upload</span>
          </label>
        </div>
      </div>
      <input className='hidden' name="avatar"  ref={inputRef} onChange={handleImageChange} type="file"  accept="image/jpeg,image/jpg,image/png" />
    </div>
  )
}
