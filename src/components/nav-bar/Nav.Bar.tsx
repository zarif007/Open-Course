"use client";
import React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { PiSunDuotone } from "react-icons/pi";
import { PiMoonStarsDuotone } from "react-icons/pi";
import Link from "next/link";
import AvatarDropdown from "./Avatar.Dropdown";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/Button";
import Paragraph from "../ui/Paragraph";
import routeElements from "@/constants/navBar";
import ElementsDropdown from "./Elements.Dropdown";
import { signIn, signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const styles = {
    icon: `h-8 w-8 cursor-pointer`,
  };

  const { data: session } = useSession();

  const { theme, setTheme } = useTheme();
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <nav className="backdrop-blur-sm bg-slate-100/75 dark:bg-gray-950/75 fixed w-full z-20 top-0 left-0 overflow-x-hidden">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {theme ? (
          <Link href="/" className="flex items-center space-x-1">
            <Image
              src={theme === "dark" ? "/dark1.png" : "/light1.png"}
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
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            {theme === "dark" ? (
              <PiSunDuotone className={styles.icon} />
            ) : (
              theme && <PiMoonStarsDuotone className={styles.icon} />
            )}
          </div>

          {session ? (
            <p onClick={() => signOut()}>{session.user?.name}</p>
          ) : (
            <Button onClick={() => signIn()}>login</Button>
          )}

          {isSignedIn ? (
            <AvatarDropdown />
          ) : (
            isLoaded && (
              <SignInButton mode="modal">
                <Button variant="general">Sign In</Button>
              </SignInButton>
            )
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
                  className="block py-2 pl-3 pr-4 rounded text-gray-900 dark:text-slate-100 md:hover:text-rose-500 md:p-0 md:dark:hover:text-rose-500"
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
