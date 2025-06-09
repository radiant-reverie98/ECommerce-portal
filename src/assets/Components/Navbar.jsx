import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
  <div>
  
  <div className="bg-gray-50 w-full h-[80px] flex items-center justify-between px-10 shadow-md fixed top-0 left-0 z-50">
    <div className="font-bold text-2xl">GrabNest</div>
    <div>
      <Link to="/registerUser" className="bg-[#ff6200] hover:bg-[#cc4e00] p-2.5 rounded-3xl font-semibold">
        Start Selling
      </Link>
    </div>
  </div>

  
  <div className="pt-[80px]">
    <div className="flex items-center mx-auto bg-gradient-to-r from-[#136207] to-[#b7f299] p-2">
      <p className="font-semibold text-white ml-10">
        Ready to start selling online? Getting powered with 36k worth benefits
      </p>
    </div>
  </div>
</div>

  )
}

export default Navbar
