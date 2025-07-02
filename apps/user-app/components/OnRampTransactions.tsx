"use client";

import { Card } from "@repo/ui/card";

type TransactionStatus = "Success" | "Pending" | "Failed";

interface Transaction {
  time: string; // ISO string
  amount: number;
  status: TransactionStatus;
  provider: string;
}

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center text-sm text-gray-500 pb-8 pt-8">
          No recent transactions
        </div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2 space-y-4">
        {transactions.map((t, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b pb-3 last:border-none"
          >
            <div>
              <div className="text-sm font-medium text-gray-700">
                Received ₹{t.amount / 100}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(t.time).toDateString()} via {t.provider}
              </div>
            </div>

            <span
              className={`text-xs font-semibold px-2 py-1 rounded-md ${
                t.status === "Success"
                  ? "bg-green-100 text-green-700"
                  : t.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
