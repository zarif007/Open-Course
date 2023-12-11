import { useAppSelector } from '@/redux/store';
import React from 'react';
import LargeHeading from '../ui/LargeHeading';
import { IUser } from '@/types/user';

const TopicContributors = () => {
  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );
  return (
    <div>
      <LargeHeading size="sm">Contributors</LargeHeading>
      <div className="flex gap-2">
        {currentCourseTopic.versions.map((version, index) => {
          const creator = version.creator as IUser;
          return (
            <div key={index}>
              <img src={creator.image} className="w-10 h-10 rounded-full" />
              <p className="rounded-full -mt-4 z-12 w-fit p-1 dark:bg-gray-800 bg-slate-300 font-semibold text-xs">
                V{index + 1}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopicContributors;
