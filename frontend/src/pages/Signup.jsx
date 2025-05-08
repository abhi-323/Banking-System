import React, { useState } from "react";
import { SiCashapp } from "react-icons/si"; // Placeholder bank icon

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-blue-200">
        {/* Bank Logo */}
        <div className="flex items-center justify-center mb-6">
          <SiCashapp className="text-4xl text-blue-600" />
          <h1 className="ml-2 text-3xl font-extrabold text-blue-700 tracking-tight">
            Finovate Bank
          </h1>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Create Your Account
        </h2>

        {message && <p className="mb-4 text-center text-red-500">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-xs text-center text-gray-500 mt-6">
          Aleary a user{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
