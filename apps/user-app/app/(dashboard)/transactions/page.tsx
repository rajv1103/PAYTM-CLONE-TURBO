// apps/user-app/app/transactions/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

type TransactionStatus = "Success" | "Pending" | "Failed";

function mapStatus(status: string): TransactionStatus {
  if (status === "Success") return "Success";
  if (status === "Pending") return "Pending";
  return "Failed";
}

async function getAllTransactions(userId: number) {
  const txns = await prisma.onRampTransaction.findMany({
    where: { userId },
    orderBy: { startTime: "desc" },
  });

  return txns.map((t) => ({
    time: new Date(t.startTime).toLocaleString(),
    amount: (t.amount / 100).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    }),
    status: mapStatus(t.status),
    provider: t.provider,
  }));
}

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-xl font-semibold">
          Unauthorized — please sign in.
        </p>
      </div>
    );
  }

  const transactions = await getAllTransactions(userId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <h1 className="text-3xl font-extrabold text-purple-700">
            All Transactions
          </h1>
          <p className="mt-1 text-gray-600">
            You’ve made {transactions.length} transaction
            {transactions.length !== 1 && "s"} so far.
          </p>
        </header>

        {/* Transactions List */}
        <div className="space-y-4">
          {transactions.map((txn, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow hover:shadow-xl transition p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-500">{txn.time}</p>
                <p className="mt-1 font-medium text-gray-800">
                  via {txn.provider}
                </p>
              </div>

              <div className="text-right space-y-1">
                <p className="text-lg font-semibold text-gray-900">
                  {txn.amount}
                </p>
                <span
                  className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
                    txn.status === "Success"
                      ? "bg-green-100 text-green-700"
                      : txn.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {txn.status}
                </span>
              </div>
            </div>
          ))}

          {transactions.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No transactions yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
