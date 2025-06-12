import React, { useState, useEffect } from 'react';
import NavbarDashboard from '../Components/NavbarDashboard';
import SidebarDashboard from '../Components/SidebarDashboard';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { URL as BASE_URL } from '../Components/url';
import { useParams, useNavigate } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams(); // product_id from URL

 const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [mrp, setMrp] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    // Fetch product details to pre-fill form
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/upload/editSingleProduct/${id}`, {
          withCredentials: true,
        });
        const product = res.data.result[0];
        console.log(product)
        setProductName(product.product_title || '');
        setDescription(product.product_description || '');
        setMrp(product.mrp || '');
        setSellingPrice(product.selling_price || '');
        setQuantity(product.quantity || '');
      } catch (err) {
        console.error("Failed to fetch product:", err);
        alert("Failed to load product details.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        product_title: productName,
        product_description: description,
        mrp,
        selling_price: sellingPrice,
        quantity,
      };

      await axios.put(`${BASE_URL}/upload/editProduct/${id}`, updatedData, {
        withCredentials: true,
      });

      alert("Product updated successfully!");
      navigate('/dashboard'); // Or wherever you want to go after editing

    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>GrabNest - Edit Product</title>
      </Helmet>
      <NavbarDashboard />
      <div className="flex">
        <SidebarDashboard />
        <div className="w-full p-6">
          <form className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg" onSubmit={handleSubmit} >
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
              Edit Product
            </h1>

            {/* Product Name */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter product description"
                required
              ></textarea>
            </div>

            {/* MRP */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">MRP</label>
              <input
                type="number"
                min="1"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter MRP"
                required
              />
            </div>

            {/* Selling Price */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Selling Price</label>
              <input
                type="number"
                min="1"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter Selling Price"
                required
              />
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter Quantity"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition duration-200 shadow-md"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
