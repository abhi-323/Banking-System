import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setLoanAccountDetails } from "../redux/reducers/LoanAccountDetailsReducer";

const LoanAccountDetails = () => {
  const loanAccount = useSelector((state) => state.loanAccountDetails.account);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/loanAccount/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Assuming only one loan account per user for now
        dispatch(setLoanAccountDetails(response.data[0]));
      })
      .catch((error) => {
        console.error("Error fetching loan account:", error);
      });
  }, [dispatch, token]);

  if (!loanAccount?.id) return <p>Loading loan account information...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Loan Account Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
        {/* Borrower Info */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Borrower</h3>
          <p>{loanAccount.user.name}</p>
          <p className="text-sm text-gray-600">{loanAccount.user.email}</p>
        </div>

        {/* Loan Summary */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Loan Summary</h3>
          <p>
            <strong>Loan Status:</strong> {loanAccount.status}
          </p>
          <p>
            <strong>PAN:</strong> {loanAccount.pan}
          </p>
          <p>
            <strong>Start Date:</strong> {loanAccount.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {loanAccount.endDate}
          </p>
        </div>

        {/* Financials */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Financial Info</h3>
          <p>
            <strong>Sanctioned Amount:</strong>{" "}
            ₹{loanAccount.sanctionedAmount.toFixed(2)}
          </p>
          <p>
            <strong>Interest Rate:</strong> {loanAccount.interestRate}%
          </p>
          <p>
            <strong>EMI:</strong> ₹{loanAccount.emiAmount.toFixed(2)}
          </p>
          <p>
            <strong>Outstanding:</strong>{" "}
            ₹{loanAccount.outstandingAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Pay EMI
        </button>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Close Loan
        </button>
      </div>
    </div>
  );
};

export default LoanAccountDetails;
