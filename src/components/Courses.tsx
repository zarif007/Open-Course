"use client";

import React from "react";
import LargeHeading from "./ui/LargeHeading";
import CourseCard from "./Course.Card";
import SwiperComp from "./ui/SwiperComp";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import { ICourse } from "@/types/course";
import CourseSkeleton from "./Skeletons/Course.Skeleton";

const creatorInfo = async (creatorId: string) => {
  const { data } = await axios.get(`/api/getUser?userId=${creatorId}`);
  return data.user;
};

const Courses = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const { data } = await axios.get(`${v1MainEndpoint}/course`);

      return data.data.map(async (course: ICourse, index: number) => {
        return (
          <CourseCard
            course={course}
            key={index}
            creator={await creatorInfo(course.creator as string)}
          />
        );
      });
    },
  });

  return (
    <main className="relative min-h-screen flex flex-col overflow-x-hidden w-full max-w-7xl mx-auto">
      <LargeHeading className="underline decoration-rose-500">
        Courses
      </LargeHeading>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4"></div>
        {isLoading ? (
          <div className="flex flex-wrap justify-between">
            {new Array(3).fill(9).map((_, index) => (
              <CourseSkeleton key={index} />
            ))}
          </div>
        ) : (
          <SwiperComp comps={courses} slidesPerView={0} />
        )}
      </div>
    </main>
  );
};

export default Courses;
