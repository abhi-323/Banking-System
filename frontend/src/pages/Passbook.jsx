// import React from "react";

// export default function TransactionsPage() {
//   const transactions = [
//     {
//       date: "05/08/2025",
//       description: "ATM Withdrawal",
//       type: "Debit",
//       amount: "₹2,000.00",
//       balance: "₹12,345.67",
//     },
//     {
//       date: "04/08/2025",
//       description: "Salary Credit",
//       type: "Credit",
//       amount: "₹50,000.00",
//       balance: "₹14,345.67",
//     },
//     {
//       date: "02/08/2025",
//       description: "Electricity Bill",
//       type: "Debit",
//       amount: "₹1,500.00",
//       balance: "₹(35,654.33)",
//     },
//     {
//       date: "01/08/2025",
//       description: "Online Transfer from Savings",
//       type: "Credit",
//       amount: "₹5,000.00",
//       balance: "₹37,845.67",
//     },
//     {
//       date: "30/07/2025",
//       description: "Cheque Deposit",
//       type: "Credit",
//       amount: "₹10,000.00",
//       balance: "₹32,845.67",
//     },
//   ];

import React from "react";

const Passbook = () => {
  const transactions = [
    {
      date: "05/08/2025",
      description: "ATM Withdrawal",
      type: "Debit",
      amount: "₹2,000.00",
      balance: "₹12,345.67",
    },
    {
      date: "04/08/2025",
      description: "Salary Credit",
      type: "Credit",
      amount: "₹50,000.00",
      balance: "₹14,345.67",
    },
    {
      date: "02/08/2025",
      description: "Electricity Bill",
      type: "Debit",
      amount: "₹1,500.00",
      balance: "₹(35,654.33)",
    },
    {
      date: "01/08/2025",
      description: "Online Transfer from Savings",
      type: "Credit",
      amount: "₹5,000.00",
      balance: "₹37,845.67",
    },
    {
      date: "30/07/2025",
      description: "Cheque Deposit",
      type: "Credit",
      amount: "₹10,000.00",
      balance: "₹32,845.67",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-8 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-800 text-2xl font-bold">
            Passbook Transactions
          </h3>
          <p className="text-gray-600 mt-1">
            Showing your latest account activity
          </p>
        </div>
        <button className="mt-4 md:mt-0 inline-block px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500">
          Download Statement
        </button>
      </div>

      {/* Transactions Table */}
      <div className="overflow-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Type</th>
              <th className="py-3 px-6">Amount</th>
              <th className="py-3 px-6">Balance</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y">
            {transactions.map((tx, idx) => (
              <tr key={idx}>
                <td className="py-4 px-6 whitespace-nowrap">{tx.date}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {tx.description}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tx.type === "Credit"
                        ? "text-green-600 bg-green-50"
                        : "text-red-600 bg-red-50"
                    }`}
                  >
                    {tx.type}
                  </span>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">{tx.amount}</td>
                <td className="py-4 px-6 whitespace-nowrap">{tx.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Passbook;
