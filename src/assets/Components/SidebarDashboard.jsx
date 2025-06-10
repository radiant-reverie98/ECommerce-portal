import React from 'react'
import { Link } from 'react-router-dom'
import{ useState } from 'react'
import axios from 'axios';
import { URL } from './url'; 
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './userContext';

function SidebarDashboard() {
  const { setUserLogged} = useContext(UserContext);

  const Navigate = useNavigate();
  const handleLogout = async () => {
    try{
      const response = await axios.get(`${URL}/users/logoutUser`, {
        withCredentials: true
      })
      if(response.status === 200){
        localStorage.removeItem("userLogged");

        setUserLogged(false); 

        Navigate('/');
      }

    }catch(err){
      console.error(err);
      
    }
  }
  return (
    <div>
      <div className="bg-[#0e5ab0] left-0 min-h-screen w-64 flex flex-col justify-between">
        <div className="text-white text-lg font-semibold p-5">
          <h1 className="mb-4 text-semibold text-center">Dashboard</h1>
          <ul className="space-y-2">
            <li className="hover:bg-[#0c4a8b] p-2 rounded-md cursor-pointer text-center"><Link to="/dashboard">Home</Link></li>

            <li className="hover:bg-[#0c4a8b] p-2 rounded-md cursor-pointer text-center"><Link to="/dashboard/profile">Profile</Link></li>
            
            <Link to="/dashboard/listProduct"><li className="hover:bg-[#0c4a8b] p-2 rounded cursor-pointer text-center">List Product</li></Link>
            
            <li className="hover:bg-red-500 p-2 rounded cursor-pointer text-center " onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SidebarDashboard
