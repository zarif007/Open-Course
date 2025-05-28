/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/Menu.Bar';

import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const AvatarDropdown = () => {
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="!bg-transparent">
          {signedInUser && (
            <div className="flex items-center justify-center space-x-2 mx-1 cursor-pointer">
              <div className="h-10 w-10 rounded-full border-2 p-[2px]">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src={signedInUser.image}
                  alt="dp"
                />
              </div>
            </div>
          )}
        </MenubarTrigger>
        <MenubarContent className="bg-slate-100 mx-2 dark:bg-[#0a0a0a] border-2 border-slate-200 dark:border-gray-800 rounded-lg shadow-xl min-w-[220px] p-0">
          <div className="px-3 py-3 border-b border-slate-200 dark:border-gray-800">
            <div className="text-gray-950 dark:text-slate-100 font-semibold text-sm">
              {signedInUser?.name || signedInUser?.userName}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">
              {signedInUser?.email}
            </div>
          </div>
          <div className="py-1">
            <MenubarItem className="!p-0">
              <Link
                href={`/profile/${signedInUser?.userName}`}
                className="flex items-center px-3 py-2 text-gray-950 dark:text-slate-100 hover:bg-slate-200 hover:dark:bg-gray-800 transition-colors duration-150 w-full text-sm font-semibold"
              >
                Profile
              </Link>
            </MenubarItem>

            <MenubarItem className="!p-0">
              <Link
                href="/dashboard"
                className="flex items-center px-3 py-2 text-gray-950 dark:text-slate-100 hover:bg-slate-200 hover:dark:bg-gray-800 transition-colors duration-150 w-full text-sm font-semibold"
              >
                Dashboard
              </Link>
            </MenubarItem>

            <MenubarSeparator className="my-1 bg-slate-200 dark:bg-gray-800" />

            <MenubarItem
              onClick={() => signOut()}
              className="!p-0 cursor-pointer"
            >
              <div className="flex items-center px-3 py-2 text-red-500 hover:bg-slate-200 hover:dark:bg-gray-800 transition-colors duration-150 w-full text-sm font-semibold">
                Log Out
              </div>
            </MenubarItem>
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default AvatarDropdown;
