import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FiPackage } from "react-icons/fi";

import { CiShop } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './userContext';
import axios from 'axios';
import { URL } from './url';

function NavbarUser() {
  const { buyerLogged,setBuyerLogged } = useContext(UserContext);

 async function handleLogout(){
    try{
      const response = await axios.get(`${URL}/buyerAuth/logoutBuyer`,{withCredentials : true})
      if(response.status === 200){
        localStorage.removeItem("buyerLogged");
        setBuyerLogged(false)
      }
    }catch(err){
      console.error("Logout error",err)
    }
  }
  return (
    <div>
      <div className="min-w-screen bg-white h-[75px] flex p-3 items-center justify-between shadows-2xl fixed  top-0 left-0 z-50">
        <Link to="/"><div className="text-2xl text-blue-600 font-bold ml-4 cursor-pointer">GrabNest</div></Link>
        <div className="flex items-center gap-1 bg-blue-50 p-2 rounded-lg w-90 ">
            <button className="text-gray-400 p-2 font-light w-fit rounded-lg cursor-pointer"><FaMagnifyingGlass /></button>
            <div className="border-none w-full"><input type="text" className="outline-none w-full" placeholder='Search for Products,Brands and More'/></div>
        </div>
        {!buyerLogged ? (<Link to="/login"><div className="text-lg flex gap-1.5 items-center cursor-pointer hover:bg-blue-500 hover:text-white p-4 rounded-lg"><CgProfile />Login</div></Link>):(<Link to="/" onClick={handleLogout}><div className="text-lg flex gap-1.5 items-center cursor-pointer hover:bg-blue-500 hover:text-white p-4 rounded-lg"><CgProfile />Logout</div></Link>)}
        <Link to = "/cart"><div className="text-lg flex items-center gap-0.5 cursor-pointer rounded-lg p-4 hover:bg-blue-500 hover:text-white"><IoCartOutline  className="text-lg"/>Cart</div></Link>
        <Link to="/sellerHome"><div className="text-lg flex gap-1.5 items-center hover:bg-blue-500 hover:text-white p-4 rounded-lg cursor-pointer mr-4"><CiShop/>Become a seller</div></Link>
        <Link to="/myorders"><div className="text-lg flex gap-1.5 items-center hover:bg-blue-500 hover:text-white p-4 rounded-lg cursor-pointer mr-4"><FiPackage />My Orders</div></Link>
        <div></div>
      </div>
    </div>
  )
}

export default NavbarUser
