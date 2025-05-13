import React from "react";
import { useForm } from "react-hook-form";
const accounts = [
  {
    number: "4567000100043640",
    type: "SAVINGS",
    balance: 4341.88,
  },
  {
    number: "4567000100043210",
    type: "CURRENT",
    balance: 10500.0,
  },
];

const TransactionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    alert("Transaction Initiated!");
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Money Transfer</h2>

      <div className="flex justify-center items-center mb-6 space-x-4 text-sm">
        <div className="flex items-center text-green-600 font-semibold">
          <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center">
            ✓
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">From Account *</label>
          <select
            {...register("fromAccount", {
              required: "From account is required",
            })}
            className="w-full border px-3 py-2"
          >
            <option value="">-- Select Account --</option>
            {accounts.map((acc) => (
              <option key={acc.number} value={acc.number}>
                {acc.number} ({acc.type}) - Balance: ₹{acc.balance.toFixed(2)}
              </option>
            ))}
          </select>
          {errors.fromAccount && (
            <p className="text-red-600">{errors.fromAccount.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">To Account *</label>
          <select
            {...register("toAccount", { required: "To account is required" })}
            className="w-full border px-3 py-2"
          >
            <option value="">-- Select Account --</option>
            {accounts.map((acc) => (
              <option key={acc.number} value={acc.number}>
                {acc.number} ({acc.type})
              </option>
            ))}
          </select>
          {errors.toAccount && (
            <p className="text-red-600">{errors.toAccount.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Amount *</label>
          <input
            type="number"
            {...register("amount", { required: "Amount is required", min: 1 })}
            className="w-full border px-3 py-2"
            placeholder="Enter amount"
          />
          {errors.amount && (
            <p className="text-red-600">{errors.amount.message}</p>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Continue
          </button>
        </div>
      </form>
      <p className="text-sm text-pink-600 mt-4">
        Transactions can be scheduled even on Sundays and National Holidays.
      </p>
    </div>
  );
};

export default TransactionForm;
