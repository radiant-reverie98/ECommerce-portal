import React from 'react'
import NotExist from '../data/NotExist.json'
import Lottie from 'lottie-react'

function NoPageExists() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-white text-center h-screen overflow-hidden">
      <div className="w-full max-w-md">
        <Lottie animationData={NotExist} loop={true} />
      </div>
      <button
        onClick={() => window.location.href = '/'}
        className="mt-6 px-6 py-2 text-sm font-medium border border-gray-400 text-gray-700 rounded hover:bg-gray-100 transition duration-200"
      >
        Go back to Home
      </button>
    </div>
    </div>
  )
}

export default NoPageExists
