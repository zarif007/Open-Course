'use client';

import { trpc } from '@/app/_trpc/client';
import React from 'react';
import AskShort from './Ask.Short';
import CreateAskDialog from './CreateAsk.Dialog';
import { useAppSelector } from '@/redux/store';
import { ICourseAsk } from '@/types/courseAsk';
import AsksSkeleton from '../skeletons/Asks.Skeleton';

const CourseAsks = () => {
  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const version = currentCourseTopic.versions.length - 1;
  const { data: asks, isLoading } = trpc.getCourseAsks.useQuery({
    topic: currentCourseTopic.id as string,
    version,
  });

  const courseAsk = asks as ICourseAsk[];

  return (
    <div>
      <div className="flex justify-end mb-2">
        <CreateAskDialog />
      </div>

      {isLoading ? (
        <AsksSkeleton />
      ) : asks?.length ? (
        <div className="flex flex-col space-y-2">
          {courseAsk?.map((ask: ICourseAsk, index: number) => (
            <AskShort key={index} ask={ask} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CourseAsks;
