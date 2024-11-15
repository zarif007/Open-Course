import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/Menu.Bar';
import routeElements from '@/constants/navBar';
import { FiMenu } from 'react-icons/fi';
import Link from 'next/link';
import { MenubarSeparator } from '@radix-ui/react-menubar';
import {
  PiHouseDuotone,
  PiListPlusDuotone,
  PiStackDuotone,
} from 'react-icons/pi';

const routeIcons = {
  Home: <PiHouseDuotone className="w-4 h-4" />,
  Create: <PiListPlusDuotone className="w-4 h-4" />,
  Courses: <PiStackDuotone className="w-4 h-4" />,
};

const ElementsDropdown = () => {
  const styles = {
    menuBarItems:
      'cursor-pointer hover:bg-slate-200 hover:dark:bg-gray-800 font-semibold',
  };
  return (
    <Menubar className="md:hidden">
      <MenubarMenu>
        <MenubarTrigger className="!bg-transparent">
          <FiMenu className="w-8 h-8 cursor-pointer" />
        </MenubarTrigger>
        <MenubarContent className="bg-slate-100 m-2 dark:bg-[#0a0a0a] border-2 border-slate-200 dark:border-gray-800 rounded">
          {routeElements.map((route, index) => (
            <React.Fragment key={route.name}>
              <MenubarItem className={styles.menuBarItems}>
                <Link
                  href={route.redirectTo}
                  className="flex space-x-4 justify-center items-center text-gray-950 dark:text-slate-100"
                >
                  {routeIcons[route.name as 'Home' | 'Create' | 'Courses']}
                  <p>{route.name}</p>
                </Link>
              </MenubarItem>
              {index + 1 !== routeElements.length && <MenubarSeparator />}
            </React.Fragment>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ElementsDropdown;
