import React from 'react';

function Table() {
  return (
    <div >
      <main className="flex flex-col items-center">
        <div className="w-full max-w-7xl overflow-x-auto bg-[#1E293B] shadow-xl rounded-xl p-6">
          <h1 className="text-3xl font-semibold text-white mb-6 text-center">
            Product Inventory
          </h1>
          <table className="min-w-full table-auto border-collapse text-white">
            <thead className="bg-[#334155]">
              <tr>
                {['Item ID', 'Product Name', 'Category', 'Price', 'Quantity', 'Actions'].map((heading, index) => (
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
              {[
                ['1', 'Batman', 'Figure', '1000', '50'],
                ['2', 'Red Sports Car', 'Vehicle', '2500', '20'],
                ['3', 'Iron Man', 'Figure', '1500', '35'],
                ['4', 'Vintage Motorcycle', 'Vehicle', '3000', '10'],
                ['5', 'Spider-Man', 'Figure', '1200', '40'],
                ['6', 'Classic Convertible', 'Vehicle', '2800', '12'],
                ['7', 'Gadget Drone', 'Gadget', '5000', '8'],
                ['8', 'Leather Gloves', 'Accessory', '750', '100'],
                ['9', 'Star Wars Stormtrooper', 'Figure', '1300', '60'],
              ].map(([id, name, category, price, qty], index) => (
                <tr
                  key={id}
                  className={index % 2 === 0 ? 'bg-[#1E293B]' : 'bg-[#1C2C3A]'}
                >
                  <td className="px-6 py-4 text-sm border-b border-[#334155]">{id}</td>
                  <td className="px-6 py-4 text-sm border-b border-[#334155]">{name}</td>
                  <td className="px-6 py-4 text-sm border-b border-[#334155]">{category}</td>
                  <td className="px-6 py-4 text-sm border-b border-[#334155]">₹{price}</td>
                  <td className="px-6 py-4 text-sm border-b border-[#334155]">{qty}</td>
                  <td className="px-6 py-4 text-sm border-b border-[#334155]">
                    <button className="text-blue-400 hover:underline mr-4">Edit</button>
                    <button className="text-red-400 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Table;
