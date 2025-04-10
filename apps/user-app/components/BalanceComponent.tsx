export default function BalanceComponent({amount,locked}:{amount:number,locked:number}) {
    return (
      <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
        <h2 className="text-xl font-medium text-gray-800 mb-4">Balance</h2>
        <div className="space-y-3">
          <div className="flex justify-between py-1">
            <span className="text-gray-700">Unlocked balance</span>
            <span className="font-medium">{amount/100} INR</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-700">Total Locked Balance</span>
            <span className="font-medium">{locked/100} INR</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-700">Total Balance</span>
            <span className="font-medium">{(amount+locked)/100} INR</span>
          </div>
        </div>
      </div>
    )
  }
  