import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/Menu.Bar";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
const AvatarDropdown = () => {
  const styles = {
    menuBarItems:
      "cursor-pointer hover:bg-slate-200 hover:dark:bg-gray-800 font-semibold",
  };
  const { user } = useUser();

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          {user && (
            <div className="flex items-center justify-center space-x-2 mx-1 cursor-pointer">
              <Avatar className="h-12 w-12 rounded-full border-2 p-[2px] border-orange-500">
                <AvatarImage src={user.profileImageUrl} />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
            </div>
          )}
        </MenubarTrigger>
        <MenubarContent className="bg-slate-100 mx-2 dark:bg-gray-950 border-2 border-slate-200 dark:border-gray-800 rounded">
          <MenubarItem className={styles.menuBarItems}>New Tab</MenubarItem>
          <MenubarItem className={styles.menuBarItems}>New Window</MenubarItem>
          <MenubarItem className={styles.menuBarItems}>Share</MenubarItem>
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
