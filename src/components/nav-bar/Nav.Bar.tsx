"use client";

import React from "react";
import GeneralNavbar from "./General.Navbar";
import { usePathname } from "next/navigation";
import CourseBasedNavbar from "./CourseBased.Navbar";

const NavBar = () => {
  const pathname = usePathname();
  const isCoursePage = pathname?.startsWith("/course/");
  return (
    <nav className="backdrop-blur-sm bg-slate-100/75 dark:bg-gray-950/75 fixed w-full z-20 top-0 left-0 overflow-x-hidden">
      <div className="mx-auto p-4">
        {isCoursePage ? <CourseBasedNavbar /> : <GeneralNavbar />}
      </div>
    </nav>
  );
};

export default NavBar;
