import React from 'react'
import NavbarDashboard from '../Components/NavbarDashboard'
import SidebarDashboard from '../Components/SidebarDashboard'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import {URL} from '../Components/url'
import { useContext } from 'react';
import { UserContext } from '../Components/userContext';

function ProfilePage() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  
  const { user,setUser, fetchUser } = useContext(UserContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const userData = {
        name,
        contact,
        email,
        city,
        state
      };

      const response = await axios.put(`${URL}/edit/editUser`,userData,{
        withCredentials : true
      });
      if(response.status === 200){
        alert('Profile updated successfully!');
        
        await fetchUser(); // this will update context & Navbar


      }
    }catch(err){
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again later.");
    }
  }
  useEffect(() => {
    if (user) {
      setName(user.name);
      setContact(user.contact || '');
      setEmail(user.email);
      setCity(user.city || '');
      setState(user.state || '');
      console.log("User data in ProfilePage:", user);
    }
  }, [user]);

  


  
  return (
    <div>
      <NavbarDashboard/>
      <div className="flex gap-30">
        <SidebarDashboard/>
      <div className="bg-amber-100 flex items-center justify-between m-4 rounded-lg " >
        <form className="grid grid-col-1 mx-auto p-7 py-6 gap-6" onSubmit ={handleSubmit}>
            <div className="flex gap-10 items-center justify-center">
                <label className="block mb-2 text-xl font-medium text-gray-900">Your Name :</label>
            <input type="text" onChange={(e)=>setName(e.target.value)} value={name} className="block flex-1 w-96 p-2.5 mb-4  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"  placeholder="Enter your name" required />
            </div>
            <div className="flex  gap-3 items-center justify-center">
                <label className="block mb-2  text-xl font-medium text-gray-900">Contact Details:</label>
            <input value={contact} type="tel" onChange={(e)=>setContact(e.target.value)} className="block flex-1 w-96 p-2.5 mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"  placeholder="Enter your phone number" required />
            </div>
            <div className="flex gap-3 items-center justify-center">
                <label className="block mb-2 text-xl font-medium text-gray-900">Email Address :</label>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="block flex-1 w-96 p-2.5 mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"  placeholder="email@example.com" required />
            </div>
            <div className="flex flex-wrap gap-3 items-center justify-center">
                <label className="block mb-2 text-xl font-medium text-gray-900">City:</label>
            <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} className="block flex-1 w-96 p-2.5 mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"  placeholder="Enter city" required />
            <label className="block mb-2 text-xl font-medium text-gray-900">State:</label>
            <input type="text" value={state} onChange={(e)=>setState(e.target.value)} className="block flex-1 w-96 p-2.5 mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"  placeholder="Enter state" required />
            
            </div>
            <div className="flex justify-center mt-6">
                <input type="submit" value="Update Profile" className="bg-green-600  cursor-pointer px-4 py-2 rounded-lg text-md text-white w-1/3 text-center hover:bg-green-700" required />
            </div>

            
        </form>
      </div>
      </div>
      
      
    </div>
  )
}

export default ProfilePage
