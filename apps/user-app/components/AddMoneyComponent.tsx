"use client";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export default function AddMoneyComponent() {

    const router=useRouter();

  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );


  console.log(redirectUrl);


  const handleBankChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedBankName = event.target.value;
    const bank = SUPPORTED_BANKS.find((bank) => bank.name === selectedBankName);
    if (bank) {
      setRedirectUrl(bank.redirectUrl);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Add Money</h2>
      <div className="flex flex-col gap-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input
            type="text"
            placeholder="Amount"
            className="w-full text-base rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5D4EA9] focus:border-[#5D4EA9]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank
          </label>
          <div className="relative">
            <select
              defaultValue="HDFC Bank"
              className="w-full text-base text-gray-800 rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5D4EA9] focus:border-[#5D4EA9] bg-white appearance-none"
              onChange={handleBankChange}
            >
              <option value="HDFC Bank">HDFC Bank</option>
              <option value="Axis Bank">Axis Bank</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button className="bg-[#2B3443] text-white px-6 py-2.5 rounded-md hover:bg-[#3a4559] transition font-medium"
            onClick={()=>{
                router.push(redirectUrl!)
            }}
          >
            Add Money
          </button>
        </div>
      </div>
    </div>
  );
}
