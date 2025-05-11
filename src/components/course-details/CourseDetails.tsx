import React from 'react';
import LargeHeading from '../ui/LargeHeading';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import Paragraph from '../ui/Paragraph';
import SelectedTopics from './SelectedTopics';
import { formatSelectedLevels } from '@/utils/formatSelectedLevels';
import { IUser } from '@/types/user';
import ContentLogos from '@/components/course-content/ContentLogos';
import { ICourse } from '@/types/course';
import { ICourseTopic } from '@/types/courseTopic';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa6';
import DotPattern from '../ui/animation/DotPattern';
import { cn } from '@/lib/utils';

const CourseDetails = ({ course }: { course: ICourse }) => {
  const creator = course.creator as IUser;

  return (
    <div className="flex flex-col justify-start p-3 md:p-6">
      <div className="z-10 flex flex-col justify-center items-center">
        {/* <div
          className={`rounded mx-auto flex items-center space-x-2 w-4 ${
            course.coursePrivacy === 'public' ? 'bg-blue-500' : 'bg-violet-500'
          } text-sm font-semibold px-2 py-1`}
        >
          {course.coursePrivacy === 'public' ? (
            <AiOutlineUnlock />
          ) : (
            <AiOutlineLock />
          )}
          <p>{course.coursePrivacy}</p>
        </div> */}
        <LargeHeading className="text-center">{course.title}</LargeHeading>
        <div className="flex space-x-2 items-center mx-auto">
          <Paragraph className="font-bold text-md">By</Paragraph>
          <Avatar className="h-10 w-10 rounded-full border-2 p-[2px] border-rose-500 my-3">
            <AvatarImage className="rounded-full" src={creator.image} />
            <AvatarFallback>DP</AvatarFallback>
          </Avatar>
          <Paragraph className="font-bold text-md">{creator.name}</Paragraph>
        </div>
        <div className="flex items-center justify-center space-x-3 text-slate-500 dark:text-gray-600 my-2 font-bold">
          <FaUsers className="w-6 h-6" />
          <p>{course.enrolledUsers.length}</p>
        </div>
        <div className="flex flex-wrap mx-auto">
          <div className="m-1">
            <label className="font-semibold">Categories</label>
            <SelectedTopics selectedTopics={course.categories} mode="view" />
          </div>
          <div className="m-1">
            <label className="font-semibold">Levels</label>
            <SelectedTopics
              selectedTopics={formatSelectedLevels(course.levels)}
              mode="view"
            />
          </div>
          <div className="m-1">
            <label className="font-semibold">languages</label>
            <SelectedTopics selectedTopics={course.languages} mode="view" />
          </div>
        </div>
        <div className="md:w-[50%] mx-auto">
          <ContentLogos
            topics={course.topics as ICourseTopic[]}
            withDuration={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
