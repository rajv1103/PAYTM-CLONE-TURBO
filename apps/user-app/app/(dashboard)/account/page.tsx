// apps/user-app/app/account/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

type SessionUser = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  number?: string | null;
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as SessionUser;

  if (!user?.id) {
    return <div className="text-center p-6 text-red-500">Unauthorized</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-purple-700 mb-6">Account Details</h1>

      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            className="mt-1 p-2 border rounded-md"
            type="text"
            defaultValue={user.name ?? "N/A"}
            disabled
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            className="mt-1 p-2 border rounded-md"
            type="email"
            defaultValue={user.email ?? "N/A"}
            disabled
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <input
            className="mt-1 p-2 border rounded-md"
            type="text"
            defaultValue={user.number ?? "N/A"}
            disabled
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">User ID</label>
          <input
            className="mt-1 p-2 border rounded-md"
            type="text"
            defaultValue={user.id}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
