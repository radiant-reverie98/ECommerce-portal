import React from "react";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterUser() {
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validate = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z]{1,12}$/.test(name.trim())) {
      errors.name = "Name must be letters only and max 12 characters";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Invalid email format";
    }

    if (!username.trim()) {
      errors.username = "Username is required";
    } else if (username.length < 6 || username.length > 12) {
      errors.username = "Username must be 6 to 12 characters long";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(username)) {
      errors.username = "Username must contain at least one special character";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8 || password.length > 12) {
      errors.password = "Password must be 8 to 12 characters long";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = "Password must contain at least one special character";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="w-96 bg-gray-50 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center mt-3">REGISTER</h1>
        <form>
          <div className="mt-3 mx-auto">
            <label className="block mx-4 font-medium text-gray-700">Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-9/10 mx-auto px-3 py-2 border font-sans border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-50 sm:text-sm"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs ml-4 mt-1 italic">{errors.name}</p>
            )}
          </div>

          <div className="mt-3 mx-auto">
            <label className="block mx-4 font-medium text-gray-700">Email</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-9/10 mx-auto px-3 py-2 border font-sans border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-50 sm:text-sm"
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs ml-4 mt-1 italic">{errors.email}</p>
            )}
          </div>

          <div className="mt-3 mx-auto">
            <label className="block mx-4 font-medium text-gray-700">Username</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-9/10 mx-auto px-3 py-2 border font-sans border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-50 sm:text-sm"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs ml-4 mt-1 italic">{errors.username}</p>
            )}
          </div>

          <div className="mt-3">
            <label className="block mx-4 font-medium text-gray-700">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-9/10 mx-auto px-3 py-2 border font-sans border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-50 sm:text-sm"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs ml-4 mt-1 italic">{errors.password}</p>
            )}
          </div>

          <div className="mt-3 mb-1.5 flex justify-center rounded-md py-3">
            <input
              type="submit"
              value="REGISTER"
              className="bg-blue-500 cursor-pointer px-4 py-2 rounded-lg text-md text-white w-4/5 text-center hover:bg-blue-600"
            />
          </div>
        </form>

        <p className="font-semibold flex justify-center mb-2">
          Already a seller?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-normal italic hover:underline hover:text-red-500 ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterUser;
