import { useNavigate } from "react-router-dom";

const List = ({ tableItems }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/user/${id}`);
  };

  const handleApproval = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/bankAccount/create-approve",
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
      // Optionally refresh or update the UI here
    } catch (error) {
      console.error("Error approving account:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Account Requests
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
              <th className="py-3 px-6">User</th>
              <th className="py-3 px-6">Account Type</th>
              <th className="py-3 px-6">Branch</th>
              <th className="py-3 px-6">IFSC Code</th>
              <th className="py-3 px-6">PAN</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {tableItems.map((item, idx) => (
              <tr
                key={idx}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(item.id)}
              >
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                  <img
                    src={item.avatar}
                    className="w-10 h-10 rounded-full"
                    alt="avatar"
                  />
                  <div>
                    <span className="block text-gray-700 text-sm font-medium">
                      {item.name}
                    </span>
                    <span className="block text-gray-700 text-xs">
                      {item.email}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.accountType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.branch}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.ifscCode}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.pan}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : item.status === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td
                  className="text-right px-6 whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="py-2 px-3 font-medium text-green-600 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg"
                    onClick={() => handleApproval(item.id)}
                  >
                    Approve
                  </button>
                  <button className="py-2 px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
