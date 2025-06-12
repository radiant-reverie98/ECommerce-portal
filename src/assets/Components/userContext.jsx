import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from './url'; 


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: '', email: '', contact: '', city: '', state: '' });
  const [loader,setLoader] = useState(false);
  const [userLogged, setUserLogged] = useState(() => {
  return localStorage.getItem("userLogged") === "true";
});
  const [name, setName] = useState('');

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${URL}/edit/getUserData`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUser(response.data);
        //console.log("User fetched in context:", response.data);
      }
    } catch (err) {
      console.error("Error fetching user in context:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, userLogged, setUserLogged, name, setName }}>
      {children}
    </UserContext.Provider>
  );
};
