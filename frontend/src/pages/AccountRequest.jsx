import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const branches = [
  { name: "Mumbai - Andheri", ifsc: "HDFC0001234" },
  { name: "Delhi - Connaught Place", ifsc: "ICIC0004567" },
  { name: "Bangalore - MG Road", ifsc: "SBIN0007890" },
  { name: "Hyderabad - Banjara Hills", ifsc: "AXIS0002345" },
];

const AccountRequest = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const selectedBranch = watch("branch");

  const onSubmit = async (data) => {
    const branchData = branches.find((b) => b.name === data.branch);
    const payload = {
      requestedType: data.requestedType,
      branch: data.branch,
      ifscCode: branchData ? branchData.ifsc : data.ifscCode,
      pan: data.pan,
      status: "PENDING",
    };

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/api/accountRequest/apply",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Account application submitted successfully.");
      reset();
      navigate("/account-request");
    } catch (err) {
      console.error(err);
      alert("Failed to submit application.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Apply for a New Bank Account
      </h2>
      <p className="text-gray-600 mb-6">
        Fill in the details below to request a new account with your preferred
        branch.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Account Type */}
        <div>
          <label className="block mb-1 font-medium">Account Type</label>
          <select
            {...register("requestedType", {
              required: "Account type is required",
            })}
            className="w-full border px-3 py-2"
          >
            <option value="">-- Select Account Type --</option>
            <option value="SAVINGS">Savings Account</option>
            <option value="CURRENT">Current Account</option>
            <option value="FIXED_DEPOSIT">Fixed Deposit</option>
          </select>
          {errors.requestedType && (
            <p className="text-red-600 text-sm">
              {errors.requestedType.message}
            </p>
          )}
        </div>

        {/* Branch */}
        <div>
          <label className="block mb-1 font-medium">Select Branch</label>
          <select
            {...register("branch", { required: "Branch is required" })}
            className="w-full border px-3 py-2"
          >
            <option value="">-- Choose Branch --</option>
            {branches.map((b, idx) => (
              <option key={idx} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
          {errors.branch && (
            <p className="text-red-600 text-sm">{errors.branch.message}</p>
          )}
        </div>

        {/* IFSC Code (auto-filled) */}
        {selectedBranch && (
          <div>
            <label className="block mb-1 font-medium">IFSC Code</label>
            <input
              value={
                branches.find((b) => b.name === selectedBranch)?.ifsc || ""
              }
              readOnly
              className="w-full border px-3 py-2 bg-gray-100 text-gray-700"
            />
          </div>
        )}

        {/* PAN Field */}
        <div>
          <label className="block mb-1 font-medium">PAN Number</label>
          <input
            {...register("pan", {
              required: "PAN is required",
              pattern: {
                value: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
                message: "Invalid PAN format (e.g., ABCDE1234F)",
              },
            })}
            type="text"
            className="w-full border px-3 py-2"
            placeholder="ABCDE1234F"
          />
          {errors.pan && (
            <p className="text-red-600 text-sm">{errors.pan.message}</p>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Submitting..." : "Submit Account Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountRequest;
