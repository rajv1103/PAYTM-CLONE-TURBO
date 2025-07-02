"use client";

import { useState, Fragment } from "react";
import { BellIcon, SearchIcon } from "../../../apps/user-app/components/Icons";



import { Button } from "./button";
import { Menu, Transition } from "@headlessui/react";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  const initials = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <header className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-white tracking-wider">
          PayTM
        </div>

        {/* Search */}
        <div className="relative w-1/3 hidden md:block">
          <label htmlFor="search" className="sr-only">Search</label>
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white opacity-70 w-5 h-5" />
          <input
            id="search"
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 transition"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-white/20 transition">
            <BellIcon className="w-6 h-6 text-white" />
            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Sign In/Out */}
          {!user?.name ? (
            <Button
              onClick={onSignin}
              className="bg-white/30 hover:bg-white/50 text-white"
            >
              Login
            </Button>
          ) : (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2 p-2 rounded-full hover:bg-white/20 transition">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-white font-semibold">
                  {initials}
                </div>
                <span className="text-white font-medium hidden sm:block">
                  {user.name.toUpperCase()}
                </span>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black/10 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={onSignout}
                        className={`w-full text-left px-4 py-2 ${
                          active ? "bg-gray-100" : ""
                        } text-gray-800`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </div>
    </header>
  );
};
