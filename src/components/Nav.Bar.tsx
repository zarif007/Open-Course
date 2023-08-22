"use client";
import React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { PiSunDuotone } from "react-icons/pi";
import { PiMoonStarsDuotone } from "react-icons/pi";
import Link from "next/link";
import AvatarDropdown from "./Avatar.Dropdown";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/Button";

const NavBar = () => {
  const styles = {
    icon: `h-8 w-8 cursor-pointer`,
  };

  const { theme, setTheme } = useTheme();
  const { isSignedIn, user, isLoaded } = useUser();
  // console.log(user?.fullName, user?.emailAddresses[0].emailAddress, user?.id, user?.imageUrl)
  return (
    <nav className="backdrop-blur-sm bg-slate-100/75 dark:bg-gray-950/75 fixed w-full z-20 top-0 left-0 overflow-x-hidden">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {theme ? (
          <Link href="/" className="flex items-center">
            <Image
              src={theme === "dark" ? "/dark.png" : "/light.png"}
              priority
              quality={100}
              height="100"
              width="100"
              alt="logo"
              className="h-16 w-16"
            />
          </Link>
        ) : (
          <div className="h-16 w-16"></div>
        )}
        <div className="flex md:order-2 items-center justify-center space-x-2">
          <div
            onClick={() =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            {theme === "dark" ? (
              <PiSunDuotone className={styles.icon} />
            ) : (
              theme && <PiMoonStarsDuotone className={styles.icon} />
            )}
          </div>

          {isSignedIn ? (
            <AvatarDropdown />
          ) : (
            isLoaded && (
              <SignInButton mode="modal">
                <Button variant="general">Sign In</Button>
              </SignInButton>
            )
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {/*  */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="flex flex-col font-lg font-bold p-4 md:p-0 mt-4  md:flex-row md:space-x-8 md:mt-0">
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 rounded text-gray-900 dark:text-slate-100 md:hover:text-rose-500 md:p-0 md:dark:hover:text-rose-500" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-500 md:p-0 md:dark:hover:text-rose-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Courses</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-500 md:p-0 md:dark:hover:text-rose-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Enroll</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-500 md:p-0 md:dark:hover:text-rose-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
