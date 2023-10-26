"use client";

import CourseCard from "@/components/course-cards/Course.Card";
import { ICourse } from "@/types/course";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CourseCardSkeleton from "@/components/skeletons/CourseCard.Skeleton";
import useGetInfiniteCourses from "@/hooks/queries/useGetInfiniteCourses";
import CourseSearchDialog from "@/components/course-details/CourseSearch.Dialog";
import { useSearchParams } from "next/navigation";

const LIMIT = 6;

const Courses = () => {
  const { ref, inView } = useInView();

  const searchParams = useSearchParams();

  const searchTerm = searchParams?.get("searchTerm") ?? "";

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useGetInfiniteCourses(searchTerm);

  useEffect(() => {
    refetch();
  }, [searchTerm]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const courses = data?.pages.flatMap((page) => page);

  return (
    <div className="md:mx-4">
      <div className="flex justify-end mr-4">
        <CourseSearchDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
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
    </div>
  );
};

export default Courses;
