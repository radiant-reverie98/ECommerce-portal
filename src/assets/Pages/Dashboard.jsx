import React, { useState, useEffect } from "react";
import NavbarDashboard from "../Components/NavbarDashboard";
import SidebarDashboard from "../Components/SidebarDashboard";
import { URL } from "../Components/url";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `${URL}/upload/deleteSingleProduct/${productId}`,
        { withCredentials: true }
      );

      alert(res.data.message);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.product_id !== productId)
      );
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/upload/getAllProducts`, {
          withCredentials: true,
        });
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" min-h-screen text-white">
      <Helmet>
        <title>GrabNest - Dashboard</title>
      </Helmet>

      <NavbarDashboard />
      <div className="flex">
        <SidebarDashboard />

        <div className="pl-20 w-full pt-20 px-4">
          <main className="flex flex-col items-center">
            <div className="w-full max-w-7xl overflow-x-auto bg-[#1E293B] shadow-xl rounded-xl p-6">
              <h1 className="text-3xl font-semibold text-white mb-6 text-center">
                Product Inventory
              </h1>

              <table className="min-w-full table-auto border-collapse text-white">
                <thead className="bg-[#334155]">
                  <tr>
                    {["Item ID", "Product Name", "Category", "Price", "Quantity", "Actions"].map((heading, index) => (
                      <th
                        key={index}
                        className="px-6 py-4 text-left text-sm font-semibold tracking-wide border-b border-[#475569]"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <tr
                        key={product.product_id}
                        className={index % 2 === 0 ? "bg-[#1E293B]" : "bg-[#1C2C3A]"}
                      >
                        <td className="px-6 py-4 text-sm border-b border-[#334155]">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm border-b border-[#334155]">
                          {product.product_title}
                        </td>
                        <td className="px-6 py-4 text-sm border-b border-[#334155]">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 text-sm border-b border-[#334155]">
                          ₹{product.selling_price}
                        </td>
                        <td className="px-6 py-4 text-sm border-b border-[#334155]">
                          {product.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm border-b border-[#334155]">
                          <button
                            className="text-blue-400 hover:underline mr-4 cursor-pointer"
                            onClick={() => navigate(`/dashboard/editProduct/${product.product_id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-400 hover:underline cursor-pointer"
                            onClick={() => handleDelete(product.product_id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center text-sm py-8 text-gray-300"
                      >
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
