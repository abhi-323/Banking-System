import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccountRequestData } from "../redux/reducers/accountRequestDataReducer";
import axios from "axios";

const UserAccountRequest = () => {
  const token = useSelector((state) => state.userAuth.token);
  const application = useSelector(
    (state) => state.accountRequest.application
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/accountRequest/getByUser", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch(setAccountRequestData(response.data));
      })
      .catch((error) => {
        console.error("Error:", error);
        navigate("/account-request");
      });
  }, [dispatch, token, navigate]);

  const handleRowClick = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Account Requests
          </h3>
          <p className="text-gray-600 mt-2">
            Your Account is under review. Please wait for the approval.
          </p>
        </div>
      </div>

      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6 text-center">User</th>
              <th className="py-3 px-6 text-center">Account Type</th>
              <th className="py-3 px-6 text-center">Branch</th>
              <th className="py-3 px-6 text-center">IFSC Code</th>
              <th className="py-3 px-6 text-center">PAN</th>
              <th className="py-3 px-6 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {application.map((application) => (
              <tr
                key={application.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(application.id)}
              >
                <td className=" gap-x-3 py-3 px-6 whitespace-nowrap text-center">
                  <div>
                    <span className="block text-gray-700 text-sm font-medium">
                      {application.user.name}
                    </span>
                    <span className="block text-gray-700 text-xs">
                      {application.user.email}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {application.requestedType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {application.branch}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {application.ifscCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {application.pan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      application.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : application.status === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {application.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAccountRequest;
