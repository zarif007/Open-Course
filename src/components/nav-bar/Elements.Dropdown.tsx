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
import routeElements from "@/constants/navBar";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";

const ElementsDropdown = () => {
  const styles = {
    menuBarItems:
      "cursor-pointer hover:bg-slate-200 hover:dark:bg-gray-800 font-semibold",
  };
  return (
    <Menubar className="md:hidden">
      <MenubarMenu>
        <MenubarTrigger className="!bg-transparent">
          <FiMenu className="w-8 h-8 cursor-pointer" />
        </MenubarTrigger>
        <MenubarContent className="bg-slate-100 m-2 dark:bg-gray-950 border-2 border-slate-200 dark:border-gray-800 rounded">
          {routeElements.map((route) => (
            <MenubarItem key={route.name} className={styles.menuBarItems}>
              <Link
                href={route.redirectTo}
                className="text-gray-950 dark:text-slate-100"
              >
                {route.name}
              </Link>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ElementsDropdown;
