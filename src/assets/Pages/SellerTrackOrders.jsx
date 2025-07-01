import React, { useEffect, useState } from 'react';
import NavbarDashboard from '../Components/NavbarDashboard';
import SidebarDashboard from '../Components/SidebarDashboard';
import axios from 'axios';
import { URL } from '../Components/url';

function TrackOrdersSeller() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const res = await axios.get(`${URL}/orders/sellerTrackOrders`, {
          withCredentials: true,
        });
        setOrders(res.data.orders);
      } catch (err) {
        console.error('Failed to fetch seller orders:', err);
      }
    };

    fetchSellerOrders();
  }, []);

  const handleStatusChange = async (orderItemId, newStatus) => {
    try {
      const response = await axios.put(
        `${URL}/orders/updateStatus/${orderItemId}`,
        { order_status: newStatus },
        { withCredentials: true }
      );
      console.log(response)
      setOrders((prev) =>
        prev.map((order) =>
          order.order_item_id === orderItemId
            ? { ...order, order_status: newStatus }
            : order
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const statusBadge = (status) => {
    const colorMap = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Shipped: 'bg-blue-100 text-blue-800',
      'Out for Delivery': 'bg-purple-100 text-purple-800',
      Delivered: 'bg-green-100 text-green-800',
    };

    return (
      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${colorMap[status] || 'bg-gray-100 text-gray-700'}`}>
        {status || 'Unknown'}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-width Navbar */}
      <NavbarDashboard />

      {/* Sidebar and content */}
      <div className="flex">
        <SidebarDashboard />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Track Buyer Orders
          </h1>

          {orders.length === 0 ? (
            <div className="text-gray-500 text-center mt-20">
              No orders received yet.
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order.order_item_id}
                  className="bg-white p-5 rounded-xl shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-md transition"
                >
                  {/* Product details */}
                  <div className="flex items-center gap-4">
                    <img
                      src={`${URL}/uploads/${order.product_image1}`}
                      alt={order.product_title}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {order.product_title}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Quantity: {order.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Buyer: {order.buyer_name}
                      </p>
                    </div>
                  </div>

                  {/* Status update */}
                  <div className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto">
                    {statusBadge(order.order_status)}
                    <select
                      value={order.order_status || ''}
                      onChange={(e) =>
                        handleStatusChange(order.order_item_id, e.target.value)
                      }
                      className="border border-gray-300 rounded-lg px-3 py-1 text-sm outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default TrackOrdersSeller;
