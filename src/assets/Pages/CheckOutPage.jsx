import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Components/userContext";
import NavbarUser from "../Components/NavbarUser";



function CheckoutPage() {
  const { user } = useContext(UserContext);
  const [amount, setAmount] = useState(0); // You can pass this from props or cart context

  useEffect(() => {
    // Assume this comes from total cart value
    setAmount(999); // Replace with actual logic
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();

    

    // Optional: send data to backend
    // axios.post("/api/order", { name, number, address, etc... })
  };

  return (
    <div className="bg-gray-100 min-h-screen mt-4">
      <NavbarUser />
      <div className="pt-[90px] max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">CHECKOUT</h1>

        <form
          onSubmit={handlePayment}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6"
        >
          {/* Buyer Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder = "Enter your name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder = "98XXXXXX99"
              pattern="[0-9]{10}"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Street Address */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Street Address
            </label>
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
              <label className="block font-semibold text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                placeholder="Ex. Mumbai"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="w-full">
              <label className="block font-semibold text-gray-700 mb-1">
                State
              </label>
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
            <label className="block font-semibold text-gray-700 mb-1">
              Amount to Pay
            </label>
            <input
              type="text"
              value={`₹${amount}`}
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
