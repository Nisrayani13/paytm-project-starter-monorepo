import AddMoneyComponent from "../../../components/AddMoneyComponent";
import BalanceComponent from "../../../components/BalanceComponent";
import OnRampTransactionsComponent from "../../../components/OnRampTransactionsComponent";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { headers } from "next/headers";


const transactions = [
  {
    time: new Date(), // Current date and time in Kharagpur, West Bengal, India (as per context)
    amount: 150.75,
    status: "SUCCESS",
    provider: "UPI Gateway A",
  },
  {
    time: new Date(Date.now() - 86400000), // Yesterday's date and time
    amount: 25.00,
    status: "PENDING",
    provider: "Net Banking B",
  },
  {
    time: new Date(2025, 3, 5, 10, 30, 0), // April 5th, 2025, 10:30 AM IST
    amount: 500.00,
    status: "SUCCESS",
    provider: "Credit Card C",
  },
  {
    time: new Date(Date.now() - 3600000 * 3), // 3 hours ago
    amount: 75.50,
    status: "FAILED",
    provider: "Wallet D",
  },
  {
    time: new Date(2025, 3, 10, 16, 0, 0), // April 10th, 2025, 4:00 PM IST
    amount: 1000.00,
    status: "SUCCESS",
    provider: "Direct Bank Transfer E",
  },
];

async function getBalance(){
  const session=await getServerSession(authOptions)
  console.log("Session",session);
  // const balance=await prisma.balance.findUnique({
  //   where:{
  //     userId: Number(session?.user?.id)
  //   }
  // })

  const cookie=headers().get("cookie")
  console.log("Server-side cookies:", cookie);

  const balance={
    amount:0,
    locked:0
  }

  return {
    amount:balance?.amount,
    locked: balance?.locked
  }
}

async function getOnRampTransactions(){
  const session=await getServerSession(authOptions)

  console.log("Session:",session)
  // const txns=await prisma.onRampTransaction.findMany({
  //   where:{
  //     userId: Number(session?.user?.id)
  //   }
  // })

  // return txns.map(t=>({
  //   time: t.startDate,
  //   amount: t.amount,
  //   status: t.status,
  //   provider: t.provider
  // }))

  return transactions
}

export default async function Transfer() {

  const balance=await getBalance();
  const transactions= await getOnRampTransactions();
  return (
    <div className="p-6">
      <h1 className="text-3xl text-[#5D4EA9] font-bold mb-6">Transfer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <AddMoneyComponent />
        </div>
        <div className="flex flex-col gap-6">
          <BalanceComponent amount={balance.amount!} locked={balance.locked!} />
          <OnRampTransactionsComponent transactions={transactions}/>
        </div>
      </div>
    </div>
  );
}
