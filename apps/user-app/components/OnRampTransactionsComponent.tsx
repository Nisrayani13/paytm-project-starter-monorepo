import { format } from "date-fns"

export default function OnRampTransactionsComponent({
  transactions = [],
}: {
  transactions?: {
    time: Date
    amount: number
    status: string
    provider: string
  }[]
}) {
  const hasTransactions = transactions.length > 0

  return (
    <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Recent Transactions</h2>

      {!hasTransactions ? (
        <div className="flex justify-center items-center py-10 text-gray-500">No Recent transactions</div>
      ) : (
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date & Time
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Provider
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {format(transaction.time, "MMM d, yyyy h:mm a")}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.amount.toLocaleString()} INR
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{transaction.provider}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        transaction.status.toLowerCase() === "completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status.toLowerCase() === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : transaction.status.toLowerCase() === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
