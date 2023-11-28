/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from "@/redux/store";
import React from "react";
import LargeHeading from "../ui/LargeHeading";
import { IUser } from "@/types/user";
import { Skeleton } from "../ui/Skeleton";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";

const CourseBasedNavbar = () => {
  const course = useAppSelector(
    (state) => state.courseViewReducer.value.course
  );

  const creator = course.creator as IUser | null;

  const router = useRouter();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items- space-x-2">
        {creator ? (
          <img
            src={creator.image}
            className="h-8 w-8 md:h-10 md:w-10 rounded-full mt-1"
            alt="dp"
          />
        ) : (
          <Skeleton className="h-8 w-8 md:h-10 md:w-10 rounded-full mt-1" />
        )}
        <p className="text-3xl md:text-4xl font-semibold">/</p>
        {course.title ? (
          <LargeHeading
            size="sm"
            className="text-start truncate text-2xl md:text-3xl lg:text-4xl underline decoration-rose-500 decoration-4"
          >
            {course.title}
          </LargeHeading>
        ) : (
          <Skeleton className="h-10 w-96" />
        )}
      </div>
      <div
        onClick={() => router.push(`/course-landing/${course.slug}`)}
        className="mr-2 cursor-pointer fixed z-24 right-0 p-1 rounded dark:bg-slate-100 bg-gray-950 dark:text-gray-950 text-slate-100"
      >
        <BiArrowBack className="h-6 w-6 md:h-8 md:w-8" />
      </div>
    </div>
  );
};

export default CourseBasedNavbar;
