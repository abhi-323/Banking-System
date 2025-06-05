import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FaBuilding, FaUserTie, FaMoneyBillWave, FaTasks } from "react-icons/fa";

const ManagerDashboard = () => {
  const [branchData, setBranchData] = useState(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8080/api/branch/details", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const { body } = res.data;
          if (body && body.branch) {
            setBranchData(body);
          } else {
            console.error("Invalid API response structure:", res.data);
          }
        })
        .catch((err) => console.error("Failed to fetch branch data:", err));
    }
  }, [dispatch, token]);

  if (!branchData)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading manager dashboard...</p>
      </div>
    );

  const { branch, totalBalance } = branchData;
  const {
    branchName,
    ifscCode,
    address,
    city,
    state,
    pincode,
    manager,
  } = branch;

  return (
    <div className="max-w-6xl mx-auto my-16 p-8 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 rounded-2xl shadow-xl">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-700 tracking-wide drop-shadow-sm">
        Manager Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branch Details Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-200 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4 text-indigo-600">
            <FaBuilding className="text-3xl mr-3" />
            <h3 className="text-2xl font-semibold">Branch Details</h3>
          </div>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Branch Name:</span> {branchName}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">IFSC Code:</span> {ifscCode}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Address:</span> {address}, {city}, {state} - {pincode}
          </p>
        </div>

        {/* Total Balance Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-green-300 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center items-center">
          <div className="flex items-center mb-3 text-green-600">
            <FaMoneyBillWave className="text-4xl mr-3" />
            <h3 className="text-2xl font-semibold">Total Branch Balance</h3>
          </div>
          <p className="text-4xl font-extrabold text-green-700">
            ₹{totalBalance !== null ? totalBalance.toFixed(2) : "0.00"}
          </p>
        </div>

        {/* Manager Profile Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-purple-300 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4 text-purple-600">
            <FaUserTie className="text-3xl mr-3" />
            <h3 className="text-2xl font-semibold">Manager Profile</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 text-gray-700">
            <p><span className="font-semibold">Name:</span> {manager?.name || "N/A"}</p>
            <p><span className="font-semibold">Email:</span> {manager?.email || "N/A"}</p>
            <p><span className="font-semibold">Role:</span> {manager?.role || "N/A"}</p>
            <p><span className="font-semibold">Status:</span> {manager?.status || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        <button
          className="flex items-center bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-indigo-600 hover:to-indigo-800 transition-colors duration-300"
          title="View pending account requests"
        >
          <FaTasks className="mr-2" /> Pending Account Requests
        </button>

        <button
          className="flex items-center bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-green-600 hover:to-green-800 transition-colors duration-300"
          title="View pending loan requests"
        >
          <FaTasks className="mr-2" /> Pending Loan Requests
        </button>

        <button
          className="flex items-center bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-red-600 hover:to-red-800 transition-colors duration-300"
          title="Manage staff"
        >
          <FaUserTie className="mr-2" /> Manage Staff
        </button>
      </div>
    </div>
  );
};

export default ManagerDashboard;
