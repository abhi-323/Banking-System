import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAccountDetails } from "../redux/reducers/accountDetailsReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AccountDetails = () => {
  const account = useSelector((state) => state.accountDetails.account);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/bankAccount/getAccountDetail", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data && response.data.id) {
          dispatch(setAccountDetails(response.data));
        } else {
          navigate("/account-request-list");
        }
      })
      .catch((error) => {
        console.error("Error fetching account details:", error);
        navigate("/account-request-list");
      });
  }, [dispatch, token, navigate]);

  if (!account.id) return <p>Loading account information...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Account Details</h2>

      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
        <div>
          <h3 className="font-semibold text-lg mb-2">Account Holder</h3>
          <p>{account.userName}</p>
          <p className="text-sm text-gray-600">{account.userEmail}</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Account Summary</h3>
          <p>
            <strong>Account Number:</strong> {account.accountNumber}
          </p>
          <p>
            <strong>Account Type:</strong> {account.accountType}
          </p>
          <p>
            <strong>Status:</strong> {account.userStatus}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Branch Info</h3>
          <p>
            <strong>Branch:</strong> {account.branch}
          </p>
          <p>
            <strong>IFSC Code:</strong> {account.ifscCode}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Balance</h3>
          <p className="text-2xl font-bold text-green-700">
            ₹{account.balance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          View Statement
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Transfer Funds
        </button>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
          Apply for Loan
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
