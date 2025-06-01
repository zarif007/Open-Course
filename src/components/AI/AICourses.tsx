import useGetInfiniteCourses from '@/hooks/queries/useGetInfiniteCourses';
import { ICourse } from '@/types/course';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CourseCard from '../course-cards/Course.Card';
import CourseCardSkeleton from '../skeletons/CourseCard.Skeleton';
import LargeHeading from '../ui/LargeHeading';

const LIMIT = 6;

const AICourses = () => {
  const { ref, inView } = useInView();
  const [courses, setCourses] = useState<ICourse[] | null>(null);

  const constructUrl = () => {
    let url = '';
    url += `&isAIGenerated=${true}`;
    return url;
  };
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useGetInfiniteCourses(constructUrl());

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    setCourses(data?.pages.flatMap((page) => page) as ICourse[] | null);
  }, [data]);
  return (
    <div className="my-12 p-4 bg-white dark:bg-neutral-800 rounded-md">
      <h2 className="font-bold text-3xl mx-4">From the Community</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 gap-3 mt-2">
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

export default AICourses;
