'use client';

import React from 'react';
import CourseCard from '../course-cards/Course.Card';
import SwiperComp from '../ui/SwiperComp';
import { useQuery } from '@tanstack/react-query';
import { ICourse } from '@/types/course';
import CourseCardSkeleton from '../skeletons/CourseCard.Skeleton';
import { buttonVariants } from '../ui/Button';
import Link from 'next/link';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import HyperText from '../ui/HyperText';

const CoursesLanding = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ['course-LandingPage'],
    queryFn: async () => {
      const { data } = await (
        await fetch(`${nextApiEndPoint}/courses?page=1&limit=7`, {
          next: { revalidate: 3600 },
        })
      ).json();
      return data.map(async (course: ICourse, index: number) => {
        return <CourseCard course={course} key={index} />;
      });
    },
  });

  return (
    <main className="flex flex-col items-center justify-center overflow-x-hidden mb-12 md:mb-20 mx-auto">
      <HyperText text="Courses" className="underline decoration-rose-500" />
      <div className="container px-5 pb-8 pt-12 w-full max-w-7xl mx-auto">
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

      <Link
        href="/courses"
        className={`${buttonVariants({
          variant: 'generalRose',
        })} bg-rose-500 dark:bg-rose-500 mb-1 hover:bg-rose-500 dark:hover:bg-rose-500`}
      >
        More Courses?
      </Link>
    </main>
  );
};

export default CoursesLanding;
