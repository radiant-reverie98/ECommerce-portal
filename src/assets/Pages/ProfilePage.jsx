import React, { useState, useEffect, useContext } from "react";
import NavbarDashboard from "../Components/NavbarDashboard";
import SidebarDashboard from "../Components/SidebarDashboard";
import axios from "axios";
import { URL } from "../Components/url";
import { UserContext } from "../Components/userContext";
import cityData from "../../assets/data/city.json";
import { Helmet } from "react-helmet";

function ProfilePage() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [availableCities, setAvailableCities] = useState([]);

  const { user, fetchUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, contact, email, city, state };

      const response = await axios.put(`${URL}/edit/editUser`, userData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert("Profile updated successfully!");
        await fetchUser();
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again later.");
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setContact(user.contact || "");
      setEmail(user.email);
      setCity(user.city || "");
      setState(user.state || "");
    }
  }, [user]);

  useEffect(() => {
    if (state && cityData[state]) {
      setAvailableCities(cityData[state]);
    } else {
      setAvailableCities([]);
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-gray-100">
       <Helmet>
        <title>GrabNest - Profile</title>
      </Helmet>
      <NavbarDashboard />
      <div className="flex">
        <SidebarDashboard />
        <div className="flex-1 p-6">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Update Your Profile
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block mb-1 text-lg font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block mb-1 text-lg font-medium text-gray-700">
                  Contact Details
                </label>
                <input
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-lg font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="email@example.com"
                  required
                />
              </div>

              {/* State & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-lg font-medium text-gray-700">
                    State
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  >
                    <option value="">Select State</option>
                    {Object.keys(cityData).map((stateName) => (
                      <option key={stateName} value={stateName}>
                        {stateName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-lg font-medium text-gray-700">
                    City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  >
                    <option value="">Select City</option>
                    {availableCities.map((cityName) => (
                      <option key={cityName} value={cityName}>
                        {cityName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full md:w-1/2 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
