import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Components/userContext";
import NavbarUser from "../Components/NavbarUser";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const { checkOutPrice } = useContext(UserContext);
  const [amount, setAmount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();
  const navigate = useNavigate()

  useEffect(() => {
    setAmount(999); // Replace with actual logic
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    setShowConfetti(true);
    
  };

  return (
    <div className="bg-gray-100 min-h-screen mt-4 relative">
      

      {/* Thank You Message Overlay */}
      {showConfetti && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <Confetti width={width} height={height} />
          <div className="text-center p-10 bg-gradient-to-br from-green-100 to-white rounded-3xl shadow-2xl max-w-lg w-full">
            <svg
              className="mx-auto mb-6"
              width="80"
              height="80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="green"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <h2 className="text-3xl font-extrabold text-green-700 mb-3">Thank You!</h2>
            <p className="text-gray-700 text-lg">Your order has been placed successfully.</p>
            <p className="text-gray-600 mt-1">Happy shopping 😊</p>

            <button
              onClick={() => {setShowConfetti(false)
                navigate("/")}
              }
              className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition duration-200"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      <NavbarUser />
      <div className="pt-[90px] max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">CHECKOUT</h1>

        <form
          onSubmit={handlePayment}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              placeholder="98XXXXXX99"
              pattern="[0-9]{10}"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Street Address */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Street Address</label>
            <input
              type="text"
              placeholder="123 Main Street"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* City and State */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block font-semibold text-gray-700 mb-1">City</label>
              <input
                type="text"
                placeholder="Ex. Mumbai"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="w-full">
              <label className="block font-semibold text-gray-700 mb-1">State</label>
              <input
                type="text"
                placeholder="Ex. Maharashtra"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Amount to Pay */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Amount to Pay</label>
            <input
              type="text"
              value={`₹${checkOutPrice}`}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          {/* Pay Now Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition duration-200"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;
