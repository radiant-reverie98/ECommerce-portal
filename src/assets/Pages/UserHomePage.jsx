import React, { useEffect, useState } from "react";
import NavbarUser from "../Components/NavbarUser";
import { URL } from "../Components/url";
import axios from "axios";

function UserHomePage() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}/buyer/homePage`);
      setProducts(response.data.result);
    } catch (err) {
      console.error("err", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <main className="bg-gray-100 min-h-screen">
        <NavbarUser />
        <div className="bg-white max-w-7xl w-[98%] rounded-lg mt-10 mx-auto flex flex-wrap gap-x-6 gap-y-8 px-4 sm:px-6 ">
  {products.map((product) => (
    <div
      key={product.product_id}
      className="rounded-lg shadow-lg transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl w-52 mt-2"
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
              ₹{product.mrp}
            </span>
          )}
          <span className="text-green-600 font-medium">
            ₹{product.selling_price}
          </span>
        </div>
      </div>
    </div>
  ))}
</div>

      </main>
    </div>
  );
}

export default UserHomePage;
