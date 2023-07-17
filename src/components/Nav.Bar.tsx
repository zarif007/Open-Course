"use client";
import React from "react";
import { Button } from "./ui/Button";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Image from "next/image";

const NavBar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { theme, setTheme } = useTheme();
  return (
    <nav className="bg-slate-100 dark:bg-gray-950 fixed w-full z-20 top-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <Image
            src={theme === "dark" ? "/dark-logo.png" : "/light-logo.png"}
            priority
            quality={100}
            height="100"
            width="100"
            alt="logo"
            className="h-20 w-20"
          />
        </a>
        <div className="flex md:order-2">
          {isSignedIn ? (
            <div className="flex items-center justify-center space-x-2 mx-1">
              <img
                src={user.profileImageUrl}
                alt="profile image"
                className="h-12 w-12 rounded-full border-2 p-[2px] border-blue-700"
              />
              {/* <SignOutButton>
                <Button variant="general">Sign Out</Button>
              </SignOutButton> */}
            </div>
          ) : (
            <SignInButton mode="modal">
              <Button variant="general">Sign In</Button>
            </SignInButton>
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
      </div>
    </nav>
  );
};

export default NavBar;
