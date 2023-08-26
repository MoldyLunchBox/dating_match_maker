import React from 'react'
import { setRegistered } from '../redux/reducers/slicer'
import { useDispatch } from 'react-redux'


export const InfoModal = () => {
    const dispatch = useDispatch()
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
      <div className="bg-white p-4 rounded-lg shadow-xl z-50">
          <h2 className="text-xl font-bold mb-4">Modal Content</h2>
          <p>This is the content of the modal.</p>
         
        
          <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4"
              onClick={()=>dispatch(setRegistered(false))}
          >
              Close
          </button>
      </div>
  </div>
  )
}
