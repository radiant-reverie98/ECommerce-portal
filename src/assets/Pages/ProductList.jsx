import React, { useState } from 'react';
import NavbarDashboard from '../Components/NavbarDashboard';
import SidebarDashboard from '../Components/SidebarDashboard';
import { Helmet } from 'react-helmet';

function ProductList() {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalImages = [...images, ...selectedFiles].slice(0, 3);
    setImages(totalImages);
  };

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
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
          <form className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
              List a Product
            </h1>

            {/* Product Name */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter product description"
                required
              ></textarea>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Upload Images (max 3)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={images.length >= 3}
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
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                MRP
              </label>
              <input
                type="number"
                min = "1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter MRP"
                required
              />
            </div>

            {/* Selling Price */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Selling Price
              </label>
              <input
                min = "1"
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter Selling Price"
                required
              />
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
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
