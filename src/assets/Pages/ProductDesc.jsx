import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarUser from "../Components/NavbarUser";
import { URL } from "../Components/url";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";
import { UserContext } from "../Components/userContext";
import toast, { Toaster } from "react-hot-toast";

function ProductDesc() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { buyerLogged } = useContext(UserContext);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${URL}/buyer/productDesc/${id}`);
        const fetchedProduct = res.data.result[0];
        // console.log(fetchedProduct.quantity)
        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.product_image1);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const increaseQty = () =>
    setQuantity((prev) => (prev >= product.quantity ? product.quantity : prev + 1));
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    if (!buyerLogged) {
      toast.error("Please login first");
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/cart/addToCart`,
        { product_id: id, quantity },
        { withCredentials: true }
      );
      console.log(response)
      
      navigate("/cart");
    } catch (err) {
      toast.error("Please login first");
      console.error("Add to cart error:", err);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#98568d] border-opacity-70"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="top-center" />
      <NavbarUser />
      <div className="pt-[100px] max-w-7xl mx-auto px-4 md:px-10 pb-12">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left Side - Images */}
          <div className="w-full md:w-1/2 space-y-4">
            <div className="bg-white shadow-lg rounded-xl p-4">
              <img
                src={`${URL}/uploads/${selectedImage}`}
                alt="Main"
                className="w-full h-[420px] object-contain rounded-lg"
              />
            </div>
            <div className="flex justify-start gap-4">
              {[product.product_image1, product.product_image2, product.product_image3].map(
                (img, idx) => (
                  <img
                    key={idx}
                    src={`${URL}/uploads/${img}`}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer transition hover:scale-105 ${
                      selectedImage === img
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-transparent"
                    }`}
                    alt={`Thumbnail ${idx + 1}`}
                  />
                )
              )}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="w-full md:w-1/2 bg-white shadow-xl rounded-xl p-6 space-y-6 sticky top-28">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              {product.product_title}
            </h1>
            <p className="text-gray-600">{product.product_description || "No description available."}</p>

            {/* Price */}
            <div className="flex gap-3 items-center mt-2">
              {product.mrp !== product.selling_price && (
                <span className="text-xl text-gray-400 line-through">₹{Number(product.mrp).toLocaleString('en-IN')}</span>
              )}
              <span className="text-2xl font-semibold text-green-600">₹{Number(product.selling_price).toLocaleString('en-IN')}</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mt-4 bg-gray-100 rounded-lg px-4 py-2 w-fit shadow-sm">
              <button
                onClick={decreaseQty}
                className="p-2 rounded-md bg-white hover:bg-gray-200 transition"
              >
                <FaMinus />
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={increaseQty}
                className="p-2 rounded-md bg-white hover:bg-gray-200 transition"
              >
                <FaPlus />
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 flex-wrap mt-6">
              

              <button
                onClick={handleAddToCart}
                className={product.quantity ? "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition cursor-pointer" : "bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold shadow-md cursor-not-allowed "}  disabled={product.quantity === 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#202a44] text-white py-6 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-xl font-bold cursor-pointer">GrabNest</h1>
          <div className="flex gap-6 text-sm md:text-base">
            <span className="cursor-pointer hover:underline">Confidentiality</span>
            <span className="cursor-pointer hover:underline">Terms of Use</span>
            <span className="cursor-pointer hover:underline">Cookies</span>
          </div>
          <p className="text-sm text-gray-300">© GrabNest.in 2025, All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default ProductDesc;
