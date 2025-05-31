import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoanRequestApplication } from "../redux/reducers/loanRequestApplicationReducer";
import axios from "axios";

const LoanRequestList = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const token = useSelector((state) => state.userAuth.token);
  const loanApplications = useSelector(
    (state) => state.loanRequestApplication.application
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/loanApplication/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch(setLoanRequestApplication(response.data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [dispatch, token, refreshFlag]);

  const handleRowClick = (id) => {
    navigate(`/user/${id}`);
  };

  const handleApproval = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/loanAccount/approve",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve account");
      }

      const data = await response.json();
      console.log("Approval successful:", data);

      setRefreshFlag((prev) => !prev);
    } catch (error) {
      console.error("Error approving account:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/loanApplication/reject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      if (!response.ok) {
        throw new Error("Error rejecting loan application");
      }

      const data = await response.text();
      console.log("Reject successful:", data);
      
      setRefreshFlag((prev) => !prev);
    } catch (error) {
      console.error("Error rejecting loan application:", error);
    }
  };

  if (loanApplications.length == 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-8">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          No Application Requests Found
        </h3>
        <p className="text-gray-600 mt-2">
          There are currently no loan requests to review.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Loan Requests
          </h3>
          <p className="text-gray-600 mt-2">
            Review and approve or reject user account requests.
          </p>
        </div>
      </div>

      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6 text-center">Application Date</th>
              <th className="py-3 px-6 text-center">Requested Amount</th>
              <th className="py-3 px-6 text-center">Interest Rate</th>
              <th className="py-3 px-6 text-center">Tenure (Months)</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">PAN</th>
              <th className="py-3 px-6 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y">
            {loanApplications.map((loan, idx) => (
              <tr key={idx}>
                <td className="py-4 px-6 whitespace-nowrap text-center">
                  {loan.applicationDate}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-center">
                  {loan.requestedAmount}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-center">
                  {loan.interestRate}%
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-center">
                  {loan.tenureInMonths}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-center">
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
                <td className="py-4 px-6 whitespace-nowrap text-center">
                  {loan.pan}
                </td>
                {loan.status === "PENDING" && (
                  <td
                    className="text-center px-6 whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="py-2 px-3 font-medium text-green-600 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg"
                      onClick={() => handleApproval(loan.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="py-2 px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                      onClick={() => handleReject(loan.id)}
                    >
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanRequestList;
