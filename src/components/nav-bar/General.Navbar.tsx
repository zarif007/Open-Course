import React from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { PiSunDuotone } from 'react-icons/pi';
import { PiMoonStarsDuotone } from 'react-icons/pi';
import Link from 'next/link';
import AvatarDropdown from './Avatar.Dropdown';
import { Button, buttonVariants } from '../ui/Button';
import Paragraph from '../ui/Paragraph';
import routeElements from '@/constants/navBar';
import ElementsDropdown from './Elements.Dropdown';
import { useSession } from 'next-auth/react';
import { Skeleton } from '../ui/Skeleton';
import {
  PiHouseDuotone,
  PiListPlusDuotone,
  PiStackDuotone,
} from 'react-icons/pi';
import { usePathname } from 'next/navigation';

const routeIcons = {
  Home: <PiHouseDuotone className="w-6 h-6" />,
  Create: <PiListPlusDuotone className="w-6 h-6" />,
  Courses: <PiStackDuotone className="w-6 h-6" />,
};

const GeneralNavbar = () => {
  const styles = {
    icon: `h-8 w-8 cursor-pointer`,
    menuBarItems:
      'cursor-pointer hover:bg-slate-200 hover:dark:bg-gray-800 font-semibold',
  };

  const session = useSession();

  const { theme, setTheme } = useTheme();

  const pathname = usePathname();

  return (
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
      {theme ? (
        <Link href="/" className="flex items-center space-x-1">
          <Image
            src={theme === 'dark' ? '/dark1.png' : '/light1.png'}
            priority
            quality={100}
            height="100"
            width="100"
            alt="logo"
            className="h-16 w-16"
          />
          <Paragraph className="px-2 font-semibold rounded bg-gray-950 text-slate-100 dark:text-gray-950 dark:bg-slate-100">
            Beta
          </Paragraph>
        </Link>
      ) : (
        <div className="h-16 w-16"></div>
      )}

      <div className="flex md:order-2 items-center justify-center space-x-2">
        {/* Theme */}
        <div
          onClick={() =>
            theme === 'dark' ? setTheme('light') : setTheme('dark')
          }
        >
          {theme === 'dark' ? (
            <PiSunDuotone className={styles.icon} />
          ) : (
            theme && <PiMoonStarsDuotone className={styles.icon} />
          )}
        </div>

        {session.status !== 'loading' ? (
          session.data?.user ? (
            <AvatarDropdown />
          ) : (
            <Link
              href={`/login?callbackUrl=${pathname}`}
              className={`${buttonVariants({
                variant: 'default',
              })}`}
            >
              Sign In
            </Link>
          )
        ) : (
          <Skeleton className="rounded-full h-12 w-12" />
        )}

        {/* Elements in Mobile view */}
        <ElementsDropdown />
      </div>

      {/* Elements */}
      <div
        className="mt-2 items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-cta"
      >
        <ul className="flex flex-col font-lg font-bold p-4 md:p-0 mt-4  md:flex-row md:space-x-8 md:mt-0">
          {routeElements.map((route) => (
            <li key={route.name}>
              <Link
                href={route.redirectTo}
                className="flex justify-center items-center space-x-1 block py-2 pl-3 pr-4 rounded text-gray-900 dark:text-slate-100 md:hover:text-rose-500 px-4 py-2 md:dark:hover:text-rose-500 dark:hover:bg-gray-900 hover:bg-slate-300"
              >
                {routeIcons[route.name as 'Home' | 'Create' | 'Courses']}
                <p>{route.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GeneralNavbar;
