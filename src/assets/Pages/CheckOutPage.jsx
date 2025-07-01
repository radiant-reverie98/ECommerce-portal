import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Components/userContext";
import NavbarUser from "../Components/NavbarUser";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const {showConfetti,setShowConfetti} = useContext(UserContext)
  
  const [width, height] = useWindowSize();
  const navigate = useNavigate()

 



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
              className="mt-6 px-6 py-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-full transition duration-200"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      
    </div>
  );
}

export default CheckoutPage;
