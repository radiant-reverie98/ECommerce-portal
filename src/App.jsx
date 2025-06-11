import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Login from "./assets/Components/Login";
import Register from "./assets/Components/Register";
import HomePage from "./assets/Pages/HomePage";
import Dashboard from "./assets/Pages/Dashboard";
import ProfilePage from "./assets/Pages/ProfilePage";
import ProductList from "./assets/Pages/ProductList";
import ServerErrorPage from './assets/Pages/ServerErrorPage';
import { UserContext } from './assets/Components/userContext';

function App() {
  const { userLogged, setUserLogged } = useContext(UserContext);
  const [serverUp, setServerUp] = useState(true);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("userLogged") === "true";
    setUserLogged(storedLoginStatus);

    // Check if backend is responding
    axios.get("http://localhost:3000") // replace with your backend test endpoint
      .then(() => setServerUp(true))
      .catch(() => setServerUp(false));
  }, []);

  if (!serverUp) return <ServerErrorPage />;

  return (
    <div className="App">
      <Routes>
        {userLogged ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
            <Route path="/dashboard/listProduct" element={<ProductList />} />
            <Route path="*" element={<ServerErrorPage/>} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/loginUser" element={<Login setUserLogged={setUserLogged} />} />
            <Route path="/registerUser" element={<Register setUserLogged={setUserLogged} />} />
            <Route path="*" element={<ServerErrorPage />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
