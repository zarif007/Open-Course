"use client";

import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/Menu.Bar";

import { SignOutButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
const AvatarDropdown = () => {
  const styles = {
    menuBarItems:
      "cursor-pointer hover:bg-slate-200 hover:dark:bg-gray-800 font-semibold",
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
              <Avatar className="h-12 w-12 rounded-full border-2 p-[2px] border-rose-500">
                <AvatarImage
                  className="rounded-full"
                  src={signedInUser.attributes.image_url}
                  alt="dp"
                />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
            </div>
          )}
        </MenubarTrigger>
        <MenubarContent className="bg-slate-100 mx-2 dark:bg-gray-950 border-2 border-slate-200 dark:border-gray-800 rounded">
          {/* <MenubarItem className={styles.menuBarItems}>
            <UserProfile />
          </MenubarItem> */}
          <MenubarItem className={styles.menuBarItems}>
            <Link
              href={`/profile/${signedInUser?.userName}`}
              className="text-gray-950 dark:text-slate-100"
            >
              {" "}
              Profile ({signedInUser?.attributes.first_name})
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className={`${styles.menuBarItems} text-red-500`}>
            <SignOutButton>Sign Out</SignOutButton>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default AvatarDropdown;
