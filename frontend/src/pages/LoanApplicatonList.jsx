import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setLoanApplication } from "../redux/reducers/loanApplicaitonReducer";
import { useDispatch } from "react-redux";
import axios from "axios";

const LoanApplicaitonList = () => {
  const loanApplications = useSelector((state) => state.loanApplication.application)
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userAuth.token);

  useEffect(() => {
  // Get Loan Application List
    axios.get("http://localhost:8080/api/loanApplication/getByUser", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(setLoanApplication(response.data))
      console.log(response.data)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }, [dispatch, token]);
  
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-8 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-800 text-2xl font-bold">
            Loan Applications
          </h3>
          <p className="text-gray-600 mt-1">
            Showing your all loan applications
          </p>
        </div>
        {/* <button className="mt-4 md:mt-0 inline-block px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500">
          Download Statement
        </button> */}
      </div>

      {/* Transactions Table */}
      <div className="overflow-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Application Date</th>
              <th className="py-3 px-6">Requested Amount</th>
              <th className="py-3 px-6">Interest Rate</th>
              <th className="py-3 px-6">Tenure (Months)</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">PAN</th>
            </tr>
          </thead>
            <tbody className="text-gray-700 divide-y">
              {loanApplications.map((loan, idx) => (
                <tr key={idx}>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {loan.applicationDate}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {loan.requestedAmount}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {loan.interestRate}%
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {loan.tenureInMonths}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        loan.status === "APPROVED"
                          ? "text-green-600 bg-green-50"
                          : loan.status === "REJECTED"
                          ? "text-red-600 bg-red-50"
                          : "text-yellow-600 bg-yellow-50"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">{loan.pan}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanApplicaitonList;
