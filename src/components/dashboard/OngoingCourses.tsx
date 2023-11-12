"use client";

import React from "react";
import LargeHeading from "../ui/LargeHeading";
import { useQuery } from "@tanstack/react-query";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { ICourse } from "@/types/course";
import CourseCardSkeleton from "../skeletons/CourseCard.Skeleton";
import SwiperComp from "../ui/SwiperComp";
import { useAppSelector } from "@/redux/store";
import CourseCardShort from "../course-cards/Course.Card.Short";
import CourseCardShortSkeleton from "../skeletons/CourseCardShort.Skeleton";
import CourseCardDashboard from "../course-cards/Course.Card.Dashboard";
import { ICourseTopic } from "@/types/courseTopic";
import CourseCardDashboardSkeleton from "../skeletons/CourseCardDashboard.Skeleton";
import { IUser } from "@/types/user";

const OngoingCourses = ({ user }: { user: IUser | null }) => {
  const { data: courses, isLoading } = useQuery({
    queryKey: [`course-onGoing-${user?.id}`],
    enabled: !!user?.id,
    staleTime: 60000, // 60 seconds
    refetchOnMount: true,
    queryFn: async () => {
      const { data } = await (
        await fetch(
          `${nextApiEndPoint}/courses/enrolledCourses/onGoing/${user?.id}`,
          { cache: "no-store" }
        )
      ).json();
      return data.map(
        async (
          state: {
            course: ICourse;
            currentTopic: ICourseTopic;
            completedTopic: number;
          },
          index: number
        ) => {
          return <CourseCardDashboard state={state} key={index} />;
        }
      );
    },
  });
  return (
    <div className="mx-auto w-full mt-8">
      <LargeHeading
        size="sm"
        className="my-6 underline decoration-rose-500 decoration-4"
      >
        Ongoing Courses
      </LargeHeading>
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-wrap -m-4"></div>
        {isLoading ? (
          <div className="flex flex-wrap justify-between">
            {new Array(3).fill(9).map((_, index) => (
              <CourseCardDashboardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <SwiperComp comps={courses} slidesPerView={0} />
        )}
      </div>
    </div>
  );
};

export default OngoingCourses;
