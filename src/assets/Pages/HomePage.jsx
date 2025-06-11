import React from 'react'
import Navbar from '../Components/Navbar'
import './HomePage.css' // Assuming you have a CSS file for styling;
import myImg from '../images/Banner img.webp'
import { Link } from 'react-router-dom'
import earnImg from '../images/Earn more.webp'
import hassle from '../images/Hassle.webp'
import newSeller from '../images/New seller.webp'
import parcel from '../images/istockphoto-1434715649-612x612.jpg'
import { Helmet } from 'react-helmet' // For setting the page title

function HomePage() {
  return (
    <div>
      <Helmet>
        <title>GrabNest | Home Page</title>
      </Helmet>
      <Navbar/>
      <div className="h-[70%] bg-[#f6f1d7] flex justify-between">
        <div className="p-15">
          <p className="font-extrabold text-6xl text-[#1c2e4a]"> From home grown</p>
          <p className="font-extrabold text-6xl text-[#1c2e4a]">to well-known</p>
          <p className="font-extrabold text-6xl text-[#ff6200] ">with GrabNest.in</p>
          <p className="text-[#1c2e4a] text-xl mt-4 leading-tight tracking-normal">Register with valid GSTN and active bank account to become<br/> a seller on GrabNest.in</p>
          <div>
            <Link to ="/registerUser" className="bg-[#ff6200] hover:bg-[#cc4e00] rounded-3xl font-semibold p-4 mt-7 text-xl inline-block">Start Selling</Link>
        </div>
        </div>
        <div>
          <img src={myImg} alt="HomePage" className="w-[465.89px] h-[350px] mt-10 ml-10 mr-10" />
        </div>
      </div>
      <div className="bg-gray-100 p-3">
        <h1 className="font-extrabold text-5xl text-center text-[#1c2e4a] word-spacing-tight">Get a head start to selling with us</h1>
        <div className="flex mx-auto justify-center mt-10">
          <div>
            <img src={newSeller} className="w-[370px] h-[400px] transform transition-transform transition-shadow duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            hover:-translate-y-2 hover:scale-[1.03] 
            will-change-transform cursor-pointer"/>
          </div>
          <div>
            <img src={hassle} className="w-[370px] h-[400px] transform transition-transform transition-shadow duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            hover:-translate-y-2 hover:scale-[1.03] 
            will-change-transform cursor-pointer"/>
          </div>
          <div>
            <img src={earnImg} className="w-[370px] h-[400px] transform transition-transform transition-shadow duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            hover:-translate-y-2 hover:scale-[1.03]
            will-change-transform cursor-pointer
            "/>
          </div>
        </div>
      </div>
      <div className="w-[85%] mx-auto rounded-md bg-[#f3f2ed] flex mt-10 mb-10 justify-between shadow-sm">
        <div className="flex flex-col justify-center p-10 mt-10 ml-7">
          <h2 className="text-5xl font-bold text-[#192841]">Start selling today!</h2>
          <p className="mt-7 text-[#826852] font-semibold">Put your products in front of customers who search for GrabNest.in everyday</p>
          <div>
            <Link to ="/registerUser" className="bg-[#ff6200] hover:bg-[#cc4e00] rounded-3xl font-semibold p-3 mt-7 text-xl inline-block ">Start Selling</Link>
        </div>
        </div>
        <div>
          <img src={parcel} className="h-[350px] rounded-lg"/>
        </div>

      </div>
      <div className="w-full bg-[#202a44] flex mt-4 p-7 text-white flex justify-between items-center">
        <h1 className="text-3xl font-bold cursor-pointer">GrabNest</h1>
        <div className="gap-5 flex justify-around">
          <span className="cursor-pointer">Confidentiality</span>
          <span className="cursor-pointer">Terms of Use</span>
          <span className="cursor-pointer">Cookies</span>
        </div>
        <p className="cursor-pointer">© GrabNest.in 2025,All rights reserved</p>

      </div>
    </div>
  )
}

export default HomePage
