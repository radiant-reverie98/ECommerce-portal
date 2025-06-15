import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarUser from "../Components/NavbarUser";
import { URL } from "../Components/url";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";

function ProductDesc() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${URL}/buyer/productDesc/${id}`);
        const fetchedProduct = res.data.result[0]
        setProduct(fetchedProduct);
        console.log(res.data.result[0].product_image1)
        setSelectedImage(fetchedProduct.product_image1);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQty = () => setQuantity(prev => (prev >= product.quantity ? product.quantity : prev+1));
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (!product) return <div className="pt-[100px] text-center">Loading...</div>;

  return (
    <div className="bg-white min-h-screen">
      <NavbarUser />
      <div className="pt-[100px] max-w-7xl mx-auto flex flex-col md:flex-row gap-10 px-4 md:px-10">
        {/* Left Side */}
        <div className="w-full md:w-1/2">
          <div className="border-gray-100 shadow-md rounded-lg overflow-hidden">
            <img
              src={`${URL}/uploads/${selectedImage}`}
              alt="Main"
              className="w-full h-[400px] object-contain"
            />
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {[product.product_image1, product.product_image2, product.product_image3].map((img, idx) => (
              <img
                key={idx}
                src={`${URL}/uploads/${img}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover border=gray-50 shadow-md mt-4 rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 ${
                  selectedImage === img ? "ring-2 ring-blue-500" : ""
                }`}
                alt={`Thumbnail ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.product_title}</h1>
          <p className="text-gray-500 font-serif">{product.product_description || "No description provided."}</p>

          <div className="flex items-center gap-4 mt-6 border-gray-100 w-fit rounded-lg bg-yellow-100 ">
            <button
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={decreaseQty}
            >
              <FaMinus />
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={increaseQty}
            >
              <FaPlus />
            </button>

            
          </div>
          <div className="flex gap-3">
                <span className={  `text-gray-500 ${product.mrp === product.selling_price ? 'hidden' : ' '}  text-2xl line-through hover:line-through`}>₹{product.mrp}</span>
                <span className="text-2xl text-green-600 hover:underline ">₹{product.selling_price}</span>
            </div>

          <div className="flex gap-6 mt-8">
            <button disabled = {product.quantity === 0} className={`${product.quantity === 0 ?'bg-gray-400 cursor-not-allowed' :'bg-yellow-500 hover:bg-yellow-600 cursor-pointer'} text-white px-6 py-3 rounded-lg font-medium shadow-lg transition`}>
              {product.quantity === 0? 'Out Of Stock' : 'Proceed to buy'}
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition">
              Add to Cart
            </button>
          </div>
        </div>
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
    </div>
  );
}

export default ProductDesc;
