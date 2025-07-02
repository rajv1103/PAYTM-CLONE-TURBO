import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import Sidebar from "../../components/Sidebar"; // ✅ Adjust path if needed

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name?.toUpperCase() || "Guest";

  return (
    <div className="flex min-h-screen">
      {/* ✅ Modern Sidebar */}
      <Sidebar userName={userName} />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 dark:bg-zinc-900">
        {children}
      </main>
    </div>
  );
}
