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
  const styles = {
    menuBarItems:
      'cursor-pointer hover:bg-slate-200 hover:dark:bg-gray-800 font-semibold',
  };

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="!bg-transparent">
          {signedInUser && (
            <div className="flex items-center justify-center space-x-2 mx-1 cursor-pointer">
              <div className="h-12 w-12 rounded-full border-2 p-[2px] border-rose-500">
                <img
                  className="rounded-full"
                  src={signedInUser.image}
                  alt="dp"
                />
              </div>
            </div>
          )}
        </MenubarTrigger>
        <MenubarContent className="bg-slate-100 mx-2 dark:bg-gray-950 border-2 border-slate-200 dark:border-gray-800 rounded">
          <MenubarItem className={styles.menuBarItems}>
            <Link
              href={`/profile/${signedInUser?.userName}`}
              className="flex space-x-2 text-gray-950 dark:text-slate-100"
            >
              <img
                src={signedInUser?.image}
                alt="dp"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-xs font-semibold">{signedInUser?.name}</p>
                <p className="text-xs font-semibold">
                  @{signedInUser?.userName}
                </p>
              </div>
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className={styles.menuBarItems}>
            <Link
              href={`/dashboard`}
              className="text-gray-950 dark:text-slate-100"
            >
              Dashboard
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            onClick={() => signOut()}
            className={`${styles.menuBarItems} text-red-500`}
          >
            Sign Out
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default AvatarDropdown;
