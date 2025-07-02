"use client";

import { useState } from "react";
import {
  HomeIcon,
  TransferIcon,
  TransactionsIcon,
  P2PTransferIcon,
  SettingsIcon,
  AccountIcon,
  HelpIcon,
  LogoutIcon,
    BellIcon,
} from "./Icons";

import { SidebarItem } from "./SidebarItem";

const mainNav = [
  { title: "Home", href: "/dashboard", icon: <HomeIcon /> },
  { title: "Transfer", href: "/transfer", icon: <TransferIcon /> },
  { title: "Transactions", href: "/transactions", icon: <TransactionsIcon /> },
  { title: "P2P Transfer", href: "/p2p", icon: <P2PTransferIcon /> },
];

const settingsNav = [
  { title: "Account", href: "/account", icon: <AccountIcon /> },
  { title: "Settings", href: "/settings", icon: <SettingsIcon /> },
  { title: "Help", href: "/help", icon: <HelpIcon /> },
];

interface SidebarProps {
  userName?: string;
}

export default function Sidebar({ userName = "Guest" }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const initial = userName?.charAt(0).toUpperCase() || "?";

  return (
    <aside
      className={`h-screen flex flex-col justify-between transition-all duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-72"}
        bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-700 shadow-lg`}
    >
      <div className="p-4 space-y-6">
        {/* Branding */}
        <div className="text-center font-bold text-purple-700 dark:text-purple-400 text-2xl">
          {!collapsed ? "MyFinance" : "💰"}
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="text-xs text-gray-500 dark:text-gray-300 hover:text-purple-500"
        >
          {collapsed ? "➕" : "◀ Collapse"}
        </button>

        {/* User Info */}
        {!collapsed && (
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="bg-blue-400 text-white w-12 h-12 text-xl font-bold rounded-full flex items-center justify-center border shadow">
              {initial}
            </div>
            <div className="font-semibold text-gray-800 dark:text-gray-200">
              Hello, {userName}
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div className="space-y-1">
          {mainNav.map((item) => (
            <SidebarItem key={item.href} {...item} collapsed={collapsed} />
          ))}
        </div>

        <hr className="border-gray-300 dark:border-zinc-700 my-4" />

        {/* Settings Navigation */}
        <div className="space-y-1">
          {settingsNav.map((item) => (
            <SidebarItem key={item.href} {...item} collapsed={collapsed} />
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <SidebarItem
          href="/logout"
          title="Logout"
          icon={<LogoutIcon />}
          collapsed={collapsed}
        />
      </div>
    </aside>
  );
}
