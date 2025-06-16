import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import NoPageExists from './assets/Pages/NoPageExists';
import Login from "./assets/Components/Login";
import Register from "./assets/Components/Register";
import HomePage from "./assets/Pages/HomePage";
import Dashboard from "./assets/Pages/Dashboard";
import ProfilePage from "./assets/Pages/ProfilePage";
import ProductList from "./assets/Pages/ProductList";
import ServerErrorPage from './assets/Pages/ServerErrorPage';
import { UserContext } from './assets/Components/userContext';
import PageNotFound from './assets/Pages/PageNotFound';
import EditProduct from './assets/Pages/EditProduct';
import UserHomePage from './assets/Pages/UserHomePage';
import LoginUser from './assets/Pages/LoginUser';
import RegisterUser from './assets/Pages/RegisterUser';
import ProductDesc from './assets/Pages/ProductDesc';
import CartPage from './assets/Pages/CartPage';
import CheckoutPage from './assets/Pages/CheckOutPage';

function App() {
  const { userLogged, setUserLogged } = useContext(UserContext);
  const [serverUp, setServerUp] = useState(true);


  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("userLogged") === "true";
    setUserLogged(storedLoginStatus);

    
    axios.get("http://localhost:3000") 
      .then(() => setServerUp(true))
      .catch(() => setServerUp(false));
  }, []);

  if (!serverUp) return <PageNotFound />;

  return (
    <div className="App">
      <Routes>
        {userLogged ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
            <Route path="/dashboard/listProduct" element={<ProductList />} />
            <Route path="/dashboard/editProduct/:id" element={<EditProduct/>}/>
            <Route path="*" element={<NoPageExists/>} />
          </>
        ) : (
          <>
            
            <Route path="/sellerHome" element={<HomePage />} />
            <Route path="/loginUser" element={<Login setUserLogged={setUserLogged} />} />
            <Route path="/registerUser" element={<Register setUserLogged={setUserLogged} />} />
            <Route path="*" element={<NoPageExists />} />
          </>
        )}
        <Route path = "/" element = {<UserHomePage/>}/>
        <Route path = "/login" element = {<LoginUser/>}/>
        <Route path = "/register" element = {<RegisterUser/>}/>
        <Route path = "/product-desc/:id" element = {<ProductDesc/>}/>
        <Route path = "/cart" element={<CartPage/>}/>
        <Route path = "/checkout" element = {<CheckoutPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
