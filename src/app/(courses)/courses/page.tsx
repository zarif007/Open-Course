"use client";

import CourseCard from "@/components/course-cards/Course.Card";
import { ICourse } from "@/types/course";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CourseCardSkeleton from "@/components/skeletons/CourseCard.Skeleton";
import useGetInfiniteCourses from "@/hooks/queries/useGetInfiniteCourses";

const LIMIT = 6;

const Courses = () => {
  const { ref, inView } = useInView();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetInfiniteCourses();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const courses = data?.pages.flatMap((page) => page);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-12">
      {courses?.map((course: ICourse, index: number) => {
        return courses.length === index + 1 ? (
          <div ref={ref} key={course.id}>
            <CourseCard course={course} />
          </div>
        ) : (
          <CourseCard key={course.id} course={course} />
        );
      })}
      {(isFetchingNextPage || !courses) && (
        <React.Fragment>
          {new Array(LIMIT).fill(0).map((_, index) => (
            <div key={index} className="px-3 pb-3">
              <CourseCardSkeleton />
            </div>
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default Courses;
