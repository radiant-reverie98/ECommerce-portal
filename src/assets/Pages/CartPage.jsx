import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart, Trash2 } from 'lucide-react';
import NavbarUser from '../Components/NavbarUser';


function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:3000/cart/view', {
        withCredentials: true,
      });
      setCartItems(res.data.message);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/cart/delete/${productId}`, {
        withCredentials: true,
      });
      setCartItems((prev) => prev.filter((item) => item.product_id !== productId));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.selling_price) * item.quantity, 0);

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#98568d] border-opacity-70"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
        <NavbarUser/>
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-xl relative mt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <ShoppingCart className="w-7 h-7 text-[#98568d]" />
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-10 text-lg text-gray-500">
            Your cart is empty 
          </div>
        ) : (
          <>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div
                  key={item.cart_id}
                  className="flex justify-between items-center bg-[#f9f5fb] p-4 rounded-xl shadow hover:shadow-md transition-shadow"
                >
                  <div>
                    <h2 className="font-semibold text-gray-800">{item.product_title}</h2>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-500">Price: ₹{item.selling_price}</p>
                  </div>
                  <button
                    onClick={() => deleteItem(item.product_id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                    title="Remove from cart"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Floating Total Summary */}
            <div className="absolute bottom-[-20px] right-6 bg-[#98568d] text-white px-6 py-3 rounded-xl shadow-lg">
              <span className="font-medium">Total: ₹{totalPrice.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
