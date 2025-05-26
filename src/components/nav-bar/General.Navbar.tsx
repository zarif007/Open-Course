'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import {
  PiSunDuotone,
  PiMoonStarsDuotone,
  PiHouseDuotone,
  PiListPlusDuotone,
  PiStackDuotone,
  PiComputerTower,
  PiList,
  PiRobotDuotone,
} from 'react-icons/pi';
import Link from 'next/link';
import AvatarDropdown from './Avatar.Dropdown';
import { buttonVariants } from '../ui/Button';
import routeElements from '@/constants/navBar';
import ElementsDropdown from './Elements.Dropdown';
import { useSession } from 'next-auth/react';
import { Skeleton } from '../ui/Skeleton';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const routeIcons = {
  Home: <PiHouseDuotone className="w-4 h-4" />,
  Create: <PiListPlusDuotone className="w-4 h-4" />,
  Courses: <PiStackDuotone className="w-4 h-4" />,
};

const GeneralNavbar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const session = useSession();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 w-full transition-all duration-200'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'p-3 rounded-md',
                  scrolled
                    ? 'border-b border-gray-200 bg-background/80 backdrop-blur dark:border-gray-800'
                    : 'bg-background'
                )}
              >
                <PiList className="h-6 w-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {routeElements
                .filter((route) => route.name !== 'Create')
                .map((route) => (
                  <DropdownMenuItem key={route.name}>
                    <Link
                      href={route.redirectTo}
                      className="flex items-center gap-1 w-full"
                    >
                      {routeIcons[route.name as 'Home' | 'Create' | 'Courses']}
                      {route.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <PiSunDuotone className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <PiMoonStarsDuotone className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <PiComputerTower className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div
          className={cn(
            'hidden md:flex items-center gap-2 border px-4 py-1 rounded-md',
            scrolled
              ? 'border-b border-gray-200 bg-background/80 backdrop-blur dark:border-gray-800'
              : 'bg-background'
          )}
        >
          {theme ? (
            <Link href="/" className="flex items-center">
              <Image
                src={theme === 'light' ? '/light1.png' : '/dark1.png'}
                priority
                quality={100}
                height="40"
                width="40"
                alt="logo"
                className="h-10 w-10"
              />
            </Link>
          ) : (
            <div className="h-10 w-10"></div>
          )}

          <div className="flex items-center gap-4 ml-4">
            {routeElements.map((route) => {
              if (route.name === 'Create') return null;
              return (
                <Link
                  key={route.name}
                  href={route.redirectTo}
                  className="flex items-center gap-1 text-sm font-medium hover:underline"
                >
                  {routeIcons[route.name as 'Home' | 'Create' | 'Courses']}
                  {route.name}
                </Link>
              );
            })}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                  {theme === 'dark' ? (
                    <PiSunDuotone className="h-5 w-5" />
                  ) : (
                    theme && <PiMoonStarsDuotone className="h-5 w-5" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <PiSunDuotone className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <PiMoonStarsDuotone className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <PiComputerTower className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Theme and User */}
        <div
          className={cn(
            'flex items-center md:gap-2 border px-2 py-1 rounded-md',
            scrolled
              ? 'border-b border-gray-200 bg-background/80 backdrop-blur dark:border-gray-800'
              : 'bg-background'
          )}
        >
          {/* Replace Create button with dropdown */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium hover:underline p-2">
                  {routeIcons.Create}
                  Create
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link
                    href="/course-creation"
                    className="flex items-center gap-1 w-full"
                  >
                    <PiStackDuotone className="w-4 h-4" />
                    Course
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/ai/course-creation"
                    className="flex items-center gap-1 w-full"
                  >
                    <PiRobotDuotone className="w-4 h-4" />
                    AI Gen Course
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {session.status !== 'loading' ? (
            session.data?.user ? (
              <div className="flex items-center">
                <AvatarDropdown />
              </div>
            ) : (
              <Link
                href={`/login?callbackUrl=${pathname}`}
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'px-3 py-1 text-sm'
                )}
              >
                Sign In
              </Link>
            )
          ) : (
            <Skeleton className="rounded-full h-8 w-8" />
          )}
        </div>
      </div>
    </header>
  );
};

export default GeneralNavbar;
