import React from 'react'       
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import {URL} from './url'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App'

function Login({setUserLogged}) {
    const Navigate = useNavigate();
    const handleLogin = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${URL}/users/loginUser`,{
                username,
                password
            },{
                withCredentials: true
            })
            if(response.status === 200){
                alert("User logged in successfully");
                setUserLogged(true);
                setName(response.data.user.name);
                console.log(response)
                Navigate('/dashboard');
            }
        }catch(err){
            console.error(err);
            alert("Error logging in. Please try again.");
        }

    }
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('')
    const { setName } = useContext(UserContext);
    

  return (
    <div className="flex justify-center items-center min-h-screen ">
       <div className="flex justify-center items-center min-h-screen">
              <div className="w-96 bg-gray-50 shadow-lg rounded-lg ">
               <h1 className="text-2xl font-bold mb-4 text-center mt-3">LOGIN</h1>
               <form onSubmit={handleLogin}>
                   <div className="mt-3 mx-auto">
                       <label className="block mx-4  font-medium text-gray-700">Username</label>
                       <input type="text" onChange={(e)=> setUsername(e.target.value)} className="mt-1 block w-9/10 mx-auto px-3 py-2 border font-sans border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-50 sm:text-sm" placeholder="Enter your username" required />
                   </div>
                   <div className="mt-3">
                       <label className="block mx-4 font-medium text-gray-700">Password</label>
                       <input type="password" onChange={(e)=> setPassword(e.target.value)} className="mt-1 block w-9/10 mx-auto px-3 py-2 border font-sans border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-50 sm:text-sm" placeholder="Enter password" required />
                   </div>
                   <div className="mt-3 mb-3 flex justify-center rounded-md py-3">
                       
                       <input type="submit" value="LOGIN" className="bg-blue-500 cursor-pointer px-4 py-2 rounded-lg text-md text-white w-4/5 text-center hover:bg-blue-600" required />
                   </div>
       
               </form>
             
               <p className="font-semibold flex justify-center mb-2">Don't have an account?<Link to="/registerUser" className="text-blue-500 font-normal italic hover:underline hover:text-red-500">Register</Link></p>
               </div> 
           </div>
        
      
    </div>
  )
}

export default Login
