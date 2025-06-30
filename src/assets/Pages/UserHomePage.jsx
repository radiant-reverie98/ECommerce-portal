import React, { useEffect, useState } from "react";
import NavbarUser from "../Components/NavbarUser";
import { URL } from "../Components/url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserHomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(true);
  

  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}/buyer/homePage`);
      setProducts(response.data.result);
      // console.log(response.data.result)
      setLoading(false)
    } catch (err) {
      console.error("err", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#98568d] border-opacity-70"></div>
      </div>
    );
  }
  
  return (
    <div>
      <main className="bg-gray-100 min-h-screen pt-[90px]">
        <NavbarUser />
        <div className="bg-white max-w-7xl w-[98%] rounded-lg  mx-auto flex flex-wrap gap-x-6 gap-y-8 px-4 sm:px-6 ">
          {products.map((product) => (
            <div
              key={product.product_id} onClick={()=> navigate( `/product-desc/${product.product_id}`)}
              className="rounded-lg shadow-lg cursor-pointer transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl w-52 mt-2"
            >
              <div className="relative">
                <img
                  src={`${URL}/upload/${product.product_image1}`}
                  alt={product.product_title}
                  className="rounded-t-lg w-full h-[180px] object-cover"
                />
                <span
                  className={`absolute bottom-2 left-2 py-1 px-2 rounded-sm text-white text-[10px] ${
                    product.quantity === 0
                      ? "bg-[#98568d] bg-opacity-70"
                      : "bg-green-600 bg-opacity-80"
                  }`}
                >
                  {product.quantity === 0 ? "Sold Out" : "In Stock"}
                </span>
              </div>

              <div className="bg-blue-50 text-gray-700 text-center rounded-b-lg py-2 px-2">
                <div className="font-semibold text-sm truncate">
                  {product.product_title}
                </div>
                <div className="space-x-2 text-[13px]">
                  {product.mrp !== product.selling_price && (
                    <span className="line-through text-gray-500">
                      ₹{Number(product.mrp).toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-green-600 font-medium">
                    ₹{Number(product.selling_price).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full bg-[#202a44] flex mt-4 p-7 text-white flex justify-between items-center">
          <h1 className="text-3xl font-bold cursor-pointer">GrabNest</h1>
          <div className="gap-5 flex justify-around">
            <span className="cursor-pointer">Confidentiality</span>
            <span className="cursor-pointer">Terms of Use</span>
            <span className="cursor-pointer">Cookies</span>
          </div>
          <p className="cursor-pointer">
            © GrabNest.in 2025,All rights reserved
          </p>
        </div>
      </main>
    </div>
  );
}

export default UserHomePage;
