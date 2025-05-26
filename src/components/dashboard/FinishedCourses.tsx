'use client';

import React from 'react';
import LargeHeading from '../ui/LargeHeading';
import { useQuery } from '@tanstack/react-query';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import { ICourse } from '@/types/course';
import SwiperComp from '../ui/SwiperComp';
import CourseCardShort from '../course-cards/Course.Card.Short';
import CourseCardShortSkeleton from '../skeletons/CourseCardShort.Skeleton';
import { ICourseTopic } from '@/types/courseTopic';
import { IUser } from '@/types/user';

const FinishedCourses = ({ user }: { user: IUser | null }) => {
  const { data: courses, isLoading } = useQuery({
    queryKey: [`course-finished-${user?.id}`],
    enabled: !!user?.id,
    staleTime: 60000, // 60 seconds
    refetchOnMount: true,
    queryFn: async () => {
      const { data } = await (
        await fetch(
          `${nextApiEndPoint}/courses/enrolledCourses/finished/${user?.id}`,
          { cache: 'no-store' }
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
          return <CourseCardShort course={state.course} key={index} />;
        }
      );
    },
  });
  return (
    <div className="mx-auto w-full mt-8">
      <LargeHeading size="sm" className="my-6">
        Finished Courses
      </LargeHeading>
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-wrap -m-4"></div>
        {isLoading ? (
          <div className="flex flex-wrap justify-between">
            {new Array(3).fill(9).map((_, index) => (
              <CourseCardShortSkeleton key={index} />
            ))}
          </div>
        ) : (
          <SwiperComp comps={courses} slidesPerView={0} />
        )}
      </div>
    </div>
  );
};

export default FinishedCourses;
