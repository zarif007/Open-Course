'use client';

import React, { ReactNode, useState, useMemo, useEffect } from 'react';
import { getFavicon } from '@/utils/getFavicon';
import { ICourseTopic } from '@/types/courseTopic';
import { FcDocument } from 'react-icons/fc';
import Paragraph from '../ui/Paragraph';
import { ICheckPoint } from '@/types/checkPoint';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';
import { IEnrollState } from '@/types/enrollState';
import { ICourse } from '@/types/course';
import axios from 'axios';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import { toast } from '../ui/Toast';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';
import { Button } from '@/components/ui/Button';
import { useEnrollment } from '@/hooks/useEnrollment';

const CourseTopicsList = ({
  course,
  enrollState,
}: {
  course: ICourse;
  enrollState: IEnrollState | null;
}) => {
  const courseTopics = course?.topics ? (course.topics as ICourseTopic[]) : [];
  const checkPoints = course?.checkPoints
    ? (course.checkPoints as ICheckPoint[])
    : [];

  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const pathname = usePathname();

  const {
    loadingStatus,
    isEnrolled,
    session,
    handleEnrollment,
    navigateToCourse,
  } = useEnrollment(course, enrollState);

  const handleTopicClick = (topicId: number) => {
    if (isEnrolled === 'yes') {
      navigateToCourse(topicId);
    }
  };

  const checkPointMap = useMemo(() => {
    const map = new Map<number, string>();
    checkPoints.forEach((cp) => map.set(cp.topicID, cp.name));
    return map;
  }, [checkPoints]);

  const checkCurrentCheckPoint = (topicId: number): React.ReactNode => {
    const checkPointName = checkPointMap.get(topicId);
    if (checkPointName) {
      return (
        <div className="relative mb-2">
          <div className="flex justify-center">
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 px-5 py-2.5 rounded-md">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-slate-400 dark:bg-gray-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-gray-300 tracking-wide">
                  {checkPointName}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const favIcon = (topic: ICourseTopic): ReactNode => {
    const version = topic.versions.length - 1;
    const topicInfo = topic.versions[version];

    if (topicInfo.type === 'free_source_content') {
      const favIconUrl = getFavicon(topicInfo.data.source ?? '');
      return (
        <img src={favIconUrl} className="h-6 w-6 rounded-sm" alt="source" />
      );
    } else {
      return <FcDocument className="h-6 w-6" />;
    }
  };

  const renderTopicItem = (topic: ICourseTopic, index: number) => {
    const currentVersion = topic.versions[topic.versions.length - 1];

    if (isEnrolled === 'yes') {
      return (
        <div
          key={index}
          onClick={() => handleTopicClick(topic.topicID)}
          className="group flex items-center space-x-4 m-2 md:m-4 p-4 border border-slate-300 dark:border-gray-800 transition-all duration-200 bg-slate-100 dark:bg-gray-950 cursor-pointer hover:bg-slate-200 dark:hover:bg-gray-900"
        >
          <div className="flex-shrink-0">{favIcon(topic)}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium text-slate-900 dark:text-gray-100 line-clamp-2 leading-tight">
              {currentVersion.data.title}
            </h3>
          </div>
          <div className="flex-shrink-0">
            <Paragraph
              size="sm"
              className="text-slate-600 dark:text-gray-400 font-medium bg-slate-200 dark:bg-gray-800 px-2 py-1 rounded-md"
            >
              {currentVersion.data.duration}m
            </Paragraph>
          </div>
        </div>
      );
    }

    return (
      <Popover
        key={index}
        open={openPopover === index}
        onOpenChange={(open) => setOpenPopover(open ? index : null)}
      >
        <PopoverTrigger asChild>
          <div className="group flex items-center space-x-4 m-2 md:m-4 p-4 border border-slate-300 dark:border-gray-800 transition-all duration-200 bg-slate-100 dark:bg-gray-950 cursor-pointer hover:bg-slate-200 dark:hover:bg-gray-900">
            <div className="flex-shrink-0">{favIcon(topic)}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-slate-900 dark:text-gray-100 line-clamp-2 leading-tight">
                {currentVersion.data.title}
              </h3>
            </div>
            <div className="flex-shrink-0">
              <Paragraph
                size="sm"
                className="text-slate-600 dark:text-gray-400 font-medium bg-slate-200 dark:bg-gray-800 px-2 py-1 rounded-md"
              >
                {currentVersion.data.duration}m
              </Paragraph>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4">
          <div className="space-y-3">
            {!session?.user ? (
              <div className="space-y-2">
                <p className="text-md font-semibold text-slate-900 dark:text-gray-100">
                  Signup to view
                </p>
                <Link
                  href={`/login?callbackUrl=${pathname}`}
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'px-3 py-1 text-sm w-full text-center'
                  )}
                >
                  {loadingStatus === 'Redirecting'
                    ? 'Redirecting...'
                    : 'Sign In'}
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-md font-semibold text-slate-900 dark:text-gray-100">
                  Enroll to view
                </p>
                <Button
                  className="w-full"
                  isLoading={loadingStatus !== 'free'}
                  onClick={handleEnrollment}
                >
                  {loadingStatus === 'Redirecting'
                    ? 'Redirecting...'
                    : 'Enroll Now'}
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="mb-8 space-y-3">
      {courseTopics.map((topic, index: number) => (
        <div key={index}>
          {checkCurrentCheckPoint(topic.topicID)}
          {renderTopicItem(topic, index)}
        </div>
      ))}
    </div>
  );
};

export default CourseTopicsList;
