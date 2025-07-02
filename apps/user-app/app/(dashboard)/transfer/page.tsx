// apps/user-app/app/transfer/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";

async function getBalance(userId: number) {
  const balance = await prisma.balance.findFirst({ where: { userId } });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getTransactions(userId: number) {
  const txns = await prisma.onRampTransaction.findMany({
    where: { userId },
    orderBy: { startTime: "desc" },
  });
  return txns.map((t) => ({
    time: t.startTime.toISOString(),
    amount: t.amount,
    status: t.status as "Success" | "Pending" | "Failed",
    provider: t.provider,
  }));
}

export default async function TransferPage() {
  const session = await getServerSession(authOptions);
  const userId = Number((session?.user as { id?: string })?.id);
  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-xl font-semibold">
          Unauthorized — please sign in.
        </p>
      </div>
    );
  }

  const balance = await getBalance(userId);
  const transactions = await getTransactions(userId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600   p-8">
      <div className="max-w-5xl mx-auto bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 space-y-8">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg text-center">
          💸 Transfer Funds
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Money Card */}
          <div className="bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition">
            <AddMoney />
          </div>

          {/* Balance & Recent */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-xl p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Your Balance</h2>
                <p className="text-xl text-green-500">
                  ₹{(balance.amount / 100).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Locked: ₹{(balance.locked / 100).toLocaleString()}
                </p>
              </div>
              <div className="text-6xl opacity-20">💰</div>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6">
              <OnRampTransactions transactions={transactions} />
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-white/80">
            Need help?{" "}
            <a
              href="/help"
              className="text-yellow-300 underline hover:text-yellow-100 transition"
            >
              Visit our Help Center
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
