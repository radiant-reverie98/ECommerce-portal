import React, { useEffect, useState } from 'react';
import NavbarUser from '../Components/NavbarUser';
import axios from 'axios';
import { URL } from '../Components/url';

function TrackMyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await axios.get(`${URL}/orders/myorders`, {
          withCredentials: true,
        });
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchMyOrders();
  }, []);

  const getStatusBadge = (status) => {
    if (!status || typeof status !== 'string') {
      return <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">Unknown</span>;
    }

    switch (status.toLowerCase()) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">Pending</span>;
      case 'shipped':
        return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Shipped</span>;
      case 'out for delivery':
        return <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Out for Delivery</span>;
      case 'delivered':
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Delivered</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{status}</span>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavbarUser />
      <div className="pt-[90px] max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-gray-500 text-center mt-20">You have not placed any orders yet.</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 flex items-center gap-5 p-4"
              >
                <img
                  src={`${URL}/uploads/${order.product_image1}`}
                  alt={order.product_title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{order.product_title}</h2>
                    <p className="text-sm text-gray-600 mt-1">Qty: {order.quantity}</p>
                  </div>
                  <div className="mt-2 md:mt-0">{getStatusBadge(order.order_status)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackMyOrders;
