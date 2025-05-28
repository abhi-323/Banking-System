import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const LoanApplicationForm = () => {
  const token = useSelector((state) => state.userAuth.token);
  const [formData, setFormData] = useState({
    requestedAmount: "",
    interestRate: 11.5,
    tenureInMonths: "",
    applicationDate: new Date().toISOString().split("T")[0], // today's date
    pan: "",
    status: "PENDING",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/loanApplication/apply",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if(response) {
        setSuccessMsg("Loan application submitted successfully!");
      }
      // setSuccessMsg("Loan application submitted successfully!");
      setFormData({
        requestedAmount: "",
        interestRate: 11.5,
        tenureInMonths: "",
        applicationDate: new Date().toISOString().split("T")[0],
        pan: "",
        status: "PENDING",
      });
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to submit loan application.");
    }

  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Apply for a Loan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="requestedAmount"
          value={formData.requestedAmount}
          onChange={handleChange}
          placeholder="Requested Amount"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          step="0.1"
          name="interestRate"
          readOnly
          value={formData.interestRate}
          onChange={handleChange}
          placeholder="Interest Rate (%)"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="tenureInMonths"
          value={formData.tenureInMonths}
          onChange={handleChange}
          placeholder="Tenure in Months"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="date"
          name="applicationDate"
          value={formData.applicationDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="pan"
          value={formData.pan}
          onChange={handleChange}
          placeholder="PAN"
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Apply
        </button>

        {successMsg && <p className="text-green-600">{successMsg}</p>}
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default LoanApplicationForm;
