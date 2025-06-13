import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiShop } from "react-icons/ci";
import { Link } from 'react-router-dom';

function NavbarUser() {
  return (
    <div>
      <div className="min-w-screen bg-white h-[75px] flex p-3 items-center justify-between shadows-2xl">
        <Link to="/"><div className="text-2xl text-blue-600 font-bold ml-4 cursor-pointer">GrabNest</div></Link>
        <div className="flex items-center gap-1 bg-blue-50 p-2 rounded-lg w-90 ">
            <button className="text-gray-400 p-2 font-light w-fit rounded-lg cursor-pointer"><FaMagnifyingGlass /></button>
            <div className="border-none w-full"><input type="text" className="outline-none w-full" placeholder='Search for Products,Brands and More'/></div>
        </div>
        <Link to="/login"><div className="text-lg flex gap-1.5 items-center cursor-pointer hover:bg-blue-500 hover:text-white p-4 rounded-lg"><CgProfile />Login</div></Link>
        <div className="text-lg flex items-center gap-0.5 cursor-pointer rounded-lg p-4 hover:bg-blue-500 hover:text-white"><IoCartOutline  className="text-lg"/>Cart</div>
        <Link to="/sellerHome"><div className="text-lg flex gap-1.5 items-center hover:bg-blue-500 hover:text-white p-4 rounded-lg cursor-pointer"><CiShop/>Become a seller</div></Link>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default NavbarUser
