import React from "react";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link } from "react-router-dom";

function LoginUser() {
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const validate = () => {
    let valid = true;
    setUsernameError("");
    setPasswordError("");
    setServerError("");

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!username.trim()) {
      setUsernameError("Username is required.");
      valid = false;
    } else if (username.length < 6 || username.length > 12) {
      setUsernameError("Username must be between 6 and 12 characters.");
      valid = false;
    } else if (!specialCharRegex.test(username)) {
      setUsernameError("Username must include at least one special character.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (password.length < 8 || password.length > 12) {
      setPasswordError("Password must be between 8 and 12 characters.");
      valid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must include at least one uppercase letter.");
      valid = false;
    } else if (!specialCharRegex.test(password)) {
      setPasswordError("Password must include at least one special character.");
      valid = false;
    }

    return valid;
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-96 bg-gray-50 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center mt-3">LOGIN</h1>
        <form>
          <div className="mt-3 mx-auto">
            <label className="block mx-4 font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-9/10 mx-auto px-3 py-2 border font-sans border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-50 sm:text-sm"
              placeholder="Enter your username"
              value={username}
            />
            {usernameError && (
              <p className="text-red-500 text-sm mt-1 ml-4">{usernameError}</p>
            )}
          </div>

          <div className="mt-3">
            <label className="block mx-4 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-9/10 mx-auto px-3 py-2 border font-sans border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-50 sm:text-sm"
              placeholder="Enter password"
              value={password}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1 ml-4">{passwordError}</p>
            )}
          </div>

          {serverError && (
            <p className="text-red-600 text-sm text-center mt-2">
              {serverError}
            </p>
          )}

          <div className="mt-3 mb-3 flex justify-center rounded-md py-3">
            <input
              type="submit"
              value="LOGIN"
              className="bg-blue-500 cursor-pointer px-4 py-2 rounded-lg text-md text-white w-4/5 text-center hover:bg-blue-600"
            />
          </div>
        </form>

        <p className="font-semibold flex justify-center mb-2">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-500 font-normal italic hover:underline hover:text-red-500 ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginUser;
