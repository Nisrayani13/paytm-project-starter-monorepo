import AddMoneyComponent from "../../../components/AddMoneyComponent";
import BalanceComponent from "../../../components/BalanceComponent";
import OnRampTransactionsComponent from "../../../components/OnRampTransactionsComponent";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";

async function getBalance(){
  const session=await getServerSession(authOptions)
  const balance=await prisma.balance.findUnique({
    where:{
      userId: Number(session?.user?.id)
    }
  })

  return {
    amount:balance?.amount,
    locked: balance?.locked
  }
}

async function getOnRampTransactions(){
  const session=await getServerSession(authOptions)
  const txns=await prisma.onRampTransaction.findMany({
    where:{
      userId: Number(session?.user?.id)
    }
  })

  return txns.map(t=>({
    time: t.startDate,
    amount: t.amount,
    status: t.status,
    provider: t.provider
  }))
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
