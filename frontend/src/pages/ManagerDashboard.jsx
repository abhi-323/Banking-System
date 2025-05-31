import React, { useEffect, useState } from "react";

const ManagerDashboard = () => {
  const [branchData, setBranchData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const dummyData = {
        totalBalance: 17180.75,
        branch: {
          id: "1a2b3c4d-1111-2222-3333-444455556666",
          ifscCode: "FIN001",
          branchName: "Finovate Main Branch",
          address: "123 Fintech Avenue",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
          manager: {
            id: "fdb6e0dd-203e-42c5-ad88-bfc11b4f5a23",
            name: "S.S Yadav",
            email: "ssyadav2025@example.com",
            role: "MANAGER",
          },
        },
      };
      setBranchData(dummyData);
    }, 500); // Simulated delay
  }, []);

  if (!branchData) return <p>Loading manager dashboard...</p>;

  const { totalBalance, branch } = branchData;
  const { branchName, ifscCode, address, city, state, pincode, manager } =
    branch;

  return (
    <div className="max-w-5xl mx-auto my-20 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Manager Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        <div>
          <h3 className="font-semibold text-xl mb-2 text-blue-700">
            Branch Details
          </h3>
          <p>
            <strong>Branch Name:</strong> {branchName}
          </p>
          <p>
            <strong>IFSC Code:</strong> {ifscCode}
          </p>
          <p>
            <strong>Address:</strong> {address}, {city}, {state} - {pincode}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-2 text-green-700">
            Total Branch Balance
          </h3>
          <p className="text-3xl font-bold text-green-700">
            ₹{totalBalance.toFixed(2)}
          </p>
        </div>

        <div className="md:col-span-2 mt-4">
          <h3 className="font-semibold text-xl mb-2 text-purple-700">
            Manager Profile
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Name:</strong> {manager.name}
              </p>
              <p>
                <strong>Email:</strong> {manager.email}
              </p>
            </div>
            <div>
              <p>
                <strong>Role:</strong> {manager.role}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Pending Account Requests
        </button>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Pending Loan Requests
        </button>
        {/* <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
          Generate Reports
        </button> */}
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Manage Staff
        </button>
      </div>
    </div>
  );
};

export default ManagerDashboard;
