"use client";

import React from "react";
import LargeHeading from "../ui/LargeHeading";
import { useQuery } from "@tanstack/react-query";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { ICourse } from "@/types/course";
import CourseCard from "../course-cards/Course.Card";
import CourseCardSkeleton from "../skeletons/CourseCard.Skeleton";
import SwiperComp from "../ui/SwiperComp";

const CreatedCourses = ({ creatorId }: { creatorId: string }) => {
  const { data: courses, isLoading } = useQuery({
    queryKey: [`course-${creatorId}`],
    queryFn: async () => {
      const { data } = await (
        await fetch(`${nextApiEndPoint}/courses/byCreator/${creatorId}`)
      ).json();
      return data.map(async (course: ICourse, index: number) => {
        return <CourseCard course={course} key={index} />;
      });
    },
  });
  return (
    <div className="mx-auto w-full mt-8">
      <LargeHeading
        size="sm"
        className="my-6 underline decoration-rose-500 decoration-4"
      >
        Created Courses
      </LargeHeading>
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-wrap -m-4"></div>
        {isLoading ? (
          <div className="flex flex-wrap justify-between">
            {new Array(3).fill(9).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <SwiperComp comps={courses} slidesPerView={0} />
        )}
      </div>
    </div>
  );
};

export default CreatedCourses;
