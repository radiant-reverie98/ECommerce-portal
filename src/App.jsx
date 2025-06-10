import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from "./assets/Components/Login";
import Register from "./assets/Components/Register";
import HomePage from "./assets/Pages/HomePage";
import Dashboard from "./assets/Pages/Dashboard";
import ProfilePage from "./assets/Pages/ProfilePage";
import ProductList from "./assets/Pages/ProductList";

import { useContext } from 'react';
import { UserContext } from './assets/Components/userContext';

function App() {
  const { userLogged, setUserLogged } = useContext(UserContext);

  return (
    <div className="App">
      <Routes>
        {userLogged ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
            <Route path="/dashboard/listProduct" element={<ProductList />} />
            <Route path="*" element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/loginUser" element={<Login setUserLogged={setUserLogged} />} />
            <Route path="/registerUser" element={<Register setUserLogged={setUserLogged} />} />
            <Route path="*" element={<HomePage />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
