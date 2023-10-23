import { useAppSelector } from "@/redux/store";
import React from "react";
import LargeHeading from "../ui/LargeHeading";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { IUser } from "@/types/user";
import { Skeleton } from "../ui/Skeleton";

const CourseBasedNavbar = () => {
  const course = useAppSelector(
    (state) => state.courseViewReducer.value.course
  );
  const { theme } = useTheme();

  const creator = course.creator as IUser | null;
  return (
    <div className="flex items- space-x-2">
      {theme ? (
        <Link href="/" className="flex items-center space-x-1">
          <Image
            src={theme === "dark" ? "/dark1.png" : "/light1.png"}
            priority
            quality={100}
            height="100"
            width="100"
            alt="logo"
            className="h-10 w-10 md:h-12 md:w-12"
          />
        </Link>
      ) : (
        <div className="h-10 w-10 md:h-12 md:w-12"></div>
      )}
      <p className="text-4xl font-semibold">/</p>
      {creator ? (
        <img src={creator.image} className="h-10 w-10 rounded-full" />
      ) : (
        <Skeleton className="h-10 w-10 rounded-full" />
      )}
      <p className="text-4xl font-semibold">/</p>
      {course.title ? (
        <LargeHeading
          size="sm"
          className="text-start truncate text-3xl lg:text-4xl underline decoration-rose-500 decoration-2"
        >
          {course.title}
        </LargeHeading>
      ) : (
        <Skeleton className="h-10 w-96" />
      )}
    </div>
  );
};

export default CourseBasedNavbar;
