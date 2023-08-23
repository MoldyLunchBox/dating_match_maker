import React, { useRef, useState } from 'react'

export const UploadPicture = () => {
    const inputRef = useRef(null)
    const [image, setImage] = useState("")

    const handleInageClick = () =>{
        inputRef.current.click()
    }

    const handleImageChange = (e) =>{
        const file = e.target.files[0]
        setImage(file)
    }
  return (
    <div onClick={handleInageClick}>
        <img className="max-w-[300px]" src={ image ? URL.createObjectURL(image) : './images/uploadImage.jpg'}  alt='' />
        <input className='hidden' ref={inputRef} onChange={handleImageChange} type="file" />
    </div>
  )
}
