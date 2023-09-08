"use client";

import CourseCard from "@/components/course-cards/Course.Card";
import { ICourse } from "@/types/course";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import axios from "axios";
import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import CourseCardSkeleton from "@/components/skeletons/CourseCard.Skeleton";

const LIMIT = 3;

const getCourses = async (page: number) => {
  const { data } = await axios.get(
    `${v1MainEndpoint}/course?page=${page}&limit=${LIMIT}`
  );
  // const { data } = await axios.get(`api/course`);
  return data.data;
};

const Courses = () => {
  const { ref, inView } = useInView();

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["courses"],
      async ({ pageParam = 1 }) => await getCourses(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage =
            lastPage.length === LIMIT ? allPages.length + 1 : undefined;
          return nextPage;
        },
      }
    );

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
