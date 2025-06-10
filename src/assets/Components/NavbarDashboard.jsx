import React from 'react'
import dummy from '../images/dummy-user.png'
import { useContext } from 'react';
import { UserContext } from './userContext'

function NavbarDashboard() {
  const {user} = useContext(UserContext);
  return (
    
    <div>
      <div className="bg-[#202a44] w-full text-white  h-20 p-5 flex justify-between items-center">
          <div className="text-xl font-semibold">GrabNest</div>
          <div className="text-md flex justify-between gap-2">
            <div className="inline flex items-center justify-between">
              <img src={dummy} className="w-6 h-6 rounded-full cursor-pointer" alt="User Avatar" />
            </div>
            <span className="hover:underline cursor-pointer">Welcome {user.name}!</span>
          </div>
          
      </div>
    </div>
  )
}

export default NavbarDashboard
