import React, { useEffect, useState } from 'react';
import NavbarDashboard from '../Components/NavbarDashboard';
import SidebarDashboard from '../Components/SidebarDashboard';
import axios from 'axios';
import { URL } from '../Components/url';

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${URL}/orders/getAllOrders`, {
          withCredentials: true,
        });
        setOrders(res.data.orders);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <NavbarDashboard />

      {/* Sidebar + Content layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md min-h-full">
          <SidebarDashboard />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders Received</h1>

          {orders.length === 0 ? (
            <div className="text-gray-500 text-center mt-20 text-lg">No orders received yet.</div>
          ) : (
            <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#f3ecf6]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Buyer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.product_title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.buyer_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
