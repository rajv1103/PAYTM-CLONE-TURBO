import { BalanceCard } from "../../../components/BalanceCard";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import Link from "next/link";
import { Card } from "@repo/ui/card";
import {
  HomeIcon,
  TransferIcon,
  TransactionsIcon,
  P2PTransferIcon,
} from "../../../components/Icons";
import Image from "next/image";

async function getHomeData() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      name: "Guest",
      balance: { amount: 0, locked: 0 },
    };
  }

  const userId = Number(session.user.id);
  const balance = await prisma.balance.findFirst({ where: { userId } });

  return {
    name: session.user.name || "User",
    balance: {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0,
    },
  };
}

export default async function HomePage() {
  const { name, balance } = await getHomeData();

  return (
    <div className="flex flex-col p-6 space-y-10">


      {/* Balance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
        <Link href="/transfer" passHref>
          <Card title="Add Money">
            <div className="flex flex-col items-center py-6 hover:shadow-lg transition">
              <TransferIcon className="w-8 h-8 mb-2 text-indigo-600" />
              <span className="mt-1 text-sm font-medium">Transfer</span>
            </div>
          </Card>
        </Link>

        <Link href="/transactions" passHref>
          <Card title="Transactions">
            <div className="flex flex-col items-center py-6 hover:shadow-lg transition">
              <TransactionsIcon className="w-8 h-8 mb-2 text-indigo-600" />
              <span className="mt-1 text-sm font-medium">View All</span>
            </div>
          </Card>
        </Link>

        <Link href="/p2p" passHref>
          <Card title="P2P Transfer">
            <div className="flex flex-col items-center py-6 hover:shadow-lg transition">
              <P2PTransferIcon className="w-8 h-8 mb-2 text-indigo-600" />
              <span className="mt-1 text-sm font-medium">Send Funds</span>
            </div>
          </Card>
        </Link>
      </div>

      {/* Promo */}
      <Card title="Special Offer">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Limited Time Deal</h2>
            <p className="text-sm text-gray-600">
              🚀 Earn 2% cashback when topping up via HDFC today!
            </p>
          </div>
          <Image
            src="/images/cashback.png"
            alt="Cashback"
            width={64}
            height={64}
            className="rounded-md"
          />
        </div>
      </Card>
    </div>
  );
}
