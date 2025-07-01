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

        Navigate('/sellerHome');
      }

    }catch(err){
      console.error(err);
      
    }
  }
  return (
    <div>
      <div className="bg-[#0e5ab0] left-0 h-full w-64 flex flex-col justify-between min-h-screen ">
        <div className="text-white text-lg font-semibold p-5">
          <h1 className="mb-4 text-semibold text-center">Dashboard</h1>
          <ul className="space-y-2">
            <Link to="/dashboard"><li className="hover:bg-[#0c4a8b] p-2 rounded-md cursor-pointer text-center">Home</li></Link>

            <Link to="/dashboard/profile"><li className="hover:bg-[#0c4a8b] p-2 rounded-md cursor-pointer text-center">Profile</li></Link>
            
            <Link to="/dashboard/listProduct"><li className="hover:bg-[#0c4a8b] p-2 rounded cursor-pointer text-center">List Product</li></Link>
            <Link to="/dashboard/trackOrder"><li className="hover:bg-[#0c4a8b] p-2 rounded cursor-pointer text-center">Track Order</li></Link>
            <Link to="/dashboard/sellerOrders"><li className="hover:bg-[#0c4a8b] p-2 rounded cursor-pointer text-center">My Orders</li></Link>
            
            <li className="hover:bg-red-500 p-2 rounded cursor-pointer text-center " onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SidebarDashboard
