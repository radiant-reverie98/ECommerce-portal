import React from 'react'
import NavbarDashboard from '../Components/NavbarDashboard'
import SidebarDashboard from '../Components/SidebarDashboard'

function ProfilePage() {
  return (
    <div>
      <NavbarDashboard/>
      <div className="flex gap-30">
        <SidebarDashboard/>
      <div className="bg-amber-100 flex items-center justify-between m-4 rounded-lg " >
        <form className="grid grid-col-1 mx-auto p-7 py-6 gap-6">
            <div className="flex gap-10 items-center justify-center">
                <label className="block mb-2 text-xl font-medium text-gray-900">Your Name :</label>
            <input type="text" className="block flex-1 w-96 p-2.5 mb-4  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"  placeholder="Enter your name" required />
            </div>
            <div className="flex  gap-3 items-center justify-center">
                <label className="block mb-2  text-xl font-medium text-gray-900">Contact Details:</label>
            <input type="tel" className="block flex-1 w-96 p-2.5 mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"  placeholder="Enter your phone number" required />
            </div>
            <div className="flex gap-3 items-center justify-center">
                <label className="block mb-2 text-xl font-medium text-gray-900">Email Address :</label>
            <input type="text" className="block flex-1 w-96 p-2.5 mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"  placeholder="email@example.com" required />
            </div>
            <div className="flex flex-wrap gap-3 items-center justify-center">
                <label className="block mb-2 text-xl font-medium text-gray-900">City:</label>
            <input type="text" className="block flex-1 w-96 p-2.5 mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"  placeholder="Enter city" required />
            <label className="block mb-2 text-xl font-medium text-gray-900">State:</label>
            <input type="text" className="block flex-1 w-96 p-2.5 mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"  placeholder="Enter state" required />
            
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
