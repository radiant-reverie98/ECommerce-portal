import React, { useState } from 'react';
import NavbarDashboard from '../Components/NavbarDashboard';
import SidebarDashboard from '../Components/SidebarDashboard';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { URL as BASE_URL } from '../Components/url';
import categoryList from '../data/category.json'; // import categories

function ProductList() {
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [mrp, setMrp] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('');

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalImages = [...images, ...selectedFiles].slice(0, 3);
    setImages(totalImages);
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length !== 3) {
      alert("Please upload exactly 3 images.");
      return;
    }

    try {
      const formData = new FormData();
      images.forEach((image) => formData.append("image[]", image));
      formData.append("product_title", productName);
      formData.append("product_description", description);
      formData.append("mrp", mrp);
      formData.append("selling_price", sellingPrice);
      formData.append("quantity", quantity);
      formData.append("category", category); 

      const res = await axios.post(
        `${BASE_URL}/upload/uploadProduct`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product listed successfully!");
      console.log(res.data);

      setProductName('');
      setDescription('');
      setMrp('');
      setSellingPrice('');
      setQuantity(1);
      setImages([]);
      setCategory('');
    } catch (err) {
      console.error("Upload failed:", err);
      if (err.response?.status === 401) {
        alert("Unauthorized. Please log in again.");
      } else {
        alert("Failed to upload product.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>GrabNest - List Product</title>
      </Helmet>
      <NavbarDashboard />
      <div className="flex">
        <SidebarDashboard />
        <div className="w-full p-6">
          <form className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
              List a Product
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

            {/* Category Dropdown */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              >
                <option value="" disabled>Select category</option>
                {categoryList.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Upload Images (exactly 3)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={images.length > 3}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-50 file:text-green-700
                  hover:file:bg-green-100 cursor-pointer"
              />
              {images.length > 0 && (
                <div className="flex gap-4 mt-4 flex-wrap">
                  {images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`upload-${index}`}
                        className="w-28 h-28 object-cover rounded-lg shadow-md border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
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
                List Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
