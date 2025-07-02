"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({
  href,
  title,
  icon,
  collapsed,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
  collapsed?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      onClick={() => router.push(href)}
      className={`group flex items-center gap-3 px-5 py-3 cursor-pointer rounded-lg transition-all duration-200
        ${selected ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-white font-semibold" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"}
      `}
    >
      <div className="text-xl">{icon}</div>
      {!collapsed && (
        <div className="text-sm transition-colors duration-200">
          {title}
        </div>
      )}
    </div>
  );
};
