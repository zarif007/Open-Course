/* eslint-disable @next/next/no-img-element */
'use client';

import React, { ReactNode } from 'react';
import Paragraph from '../ui/Paragraph';
import {
  FcApproval,
  FcDeleteRow,
  FcDocument,
  FcLock,
  FcSportsMode,
  FcUnlock,
} from 'react-icons/fc';
import TooltipComponent from '../ui/TooltipComponent';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { ICourseTopic } from '@/types/courseTopic';
import { getFavicon } from '@/utils/getFavicon';
import { useDispatch } from 'react-redux';
import {
  setCourseForCreation,
  setCurrentCourseTopicForCreation,
} from '@/redux/features/course-creation-slice';
import {
  setCourseForUpdate,
  setCurrentCourseTopicForUpdate,
} from '@/redux/features/course-update-slice';
import { useRouter } from 'next/navigation';
import { setCurrentCourseTopicForView } from '@/redux/features/course-view-slice';
import { setSelectedTopicType } from '@/redux/features/selected-topic-type';

const CourseTopic = ({
  index,
  courseTopic,
  topicPrivacy,
  mode,
}: {
  index: number;
  courseTopic: ICourseTopic;
  topicPrivacy: 'open' | 'locked';
  mode: 'creation' | 'edit' | 'view';
}) => {
  const styles = {
    icon: 'w-10 h-10 rounded p-1 hover:bg-slate-300 hover:dark:bg-gray-800',
  };

  const favIcon = (): ReactNode => {
    if (topic.type === 'free_source_content') {
      const favIconUrl = getFavicon(topic.data.source ?? '');

      return <img src={favIconUrl} className="h-7 w-7" alt="og" />;
    } else {
      return <FcDocument className="h-7 w-7" />;
    }
  };

  const course = useAppSelector((state) =>
    mode === 'view'
      ? state.courseViewReducer.value.course
      : mode === 'creation'
        ? state.courseCreationReducer.value.course
        : state.courseUpdateReducer.value.course
  );

  const currentCourseTopic = useAppSelector((state) =>
    mode === 'view'
      ? state.courseViewReducer.value.currentCourseTopic
      : mode === 'creation'
        ? state.courseCreationReducer.value.currentCourseTopic
        : state.courseUpdateReducer.value.currentCourseTopic
  );

  const enrollState = useAppSelector(
    (state) => state.courseViewReducer.value.enrollState
  );

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const version = courseTopic.versions.length - 1;
  const topic = courseTopic.versions[version];

  const isValidTopic = (): boolean => {
    const currentCourseTopic = courseTopic.topicID as number;
    return enrollState.finishedTopics.includes(currentCourseTopic.toString());
  };

  const redirectToCurrentCourseTopic = (courseTopic: ICourseTopic) => {
    if (!isValidTopic() && topicPrivacy !== 'open') return;
    router.push(`/course/${course.slug}?topicId=${courseTopic.topicID}`);
    dispatch(setCurrentCourseTopicForView(courseTopic));
  };

  const removeTopic = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    const topics = course.topics as ICourseTopic[];

    const updated = {
      ...course,
      topics: topics.filter(
        (topic: ICourseTopic) => topic.topicID !== courseTopic.topicID
      ),
    };

    dispatch(
      mode === 'creation'
        ? setCourseForCreation(updated)
        : setCourseForUpdate(updated)
    );
  };

  const handleOnClick = () => {
    mode === 'view'
      ? redirectToCurrentCourseTopic(courseTopic)
      : dispatch(
          mode === 'creation'
            ? setCurrentCourseTopicForCreation(courseTopic)
            : setCurrentCourseTopicForUpdate(courseTopic)
        );

    const topicType = courseTopic.versions[version].type;
    dispatch(setSelectedTopicType(topicType));
  };

  return (
    <section
      onClick={handleOnClick}
      className={`m-2 border-2 ${
        courseTopic.topicID === currentCourseTopic.topicID
          ? 'dark:border-rose-500 border-rose-500'
          : 'border-slate-300 dark:border-gray-800'
      } bg-slate-100 dark:bg-[#0a0a0a] px-3 md:px-4 py-2 rounded cursor-pointer
      hover:border-rose-500 hover:dark:border-rose-500`}
    >
      <div className="flex items-center justify-between">
        <div>
          <TooltipComponent content={courseTopic.versions[version].data.title}>
            <Paragraph className="truncate-text-1-line text-start">
              {index + 1}.{' '}
              <span className="font-bold">
                {courseTopic.versions[version].data.title}
              </span>{' '}
            </Paragraph>
          </TooltipComponent>
          <div className="flex space-x-2 items-center">
            {favIcon()}
            <Paragraph size="sm" className="truncate-text-1-line font-semibold">
              {courseTopic.versions[version].data.duration}m
            </Paragraph>
          </div>
        </div>

        {mode === 'view' ? (
          courseTopic.topicID === currentCourseTopic.topicID ? (
            <TooltipComponent content="Going">
              <FcSportsMode className={styles.icon} />
            </TooltipComponent>
          ) : !isValidTopic() ? (
            course.topicPrivacy === 'locked' ? (
              <TooltipComponent content="Locked">
                <FcLock className={styles.icon} />
              </TooltipComponent>
            ) : (
              <></>
            )
          ) : (
            <TooltipComponent content="Done">
              <FcApproval className={styles.icon} />
            </TooltipComponent>
          )
        ) : (
          <TooltipComponent content="Remove">
            <FcDeleteRow
              className={styles.icon}
              onClick={(e) => removeTopic(e)}
            />
          </TooltipComponent>
        )}
      </div>
    </section>
  );
};

export default CourseTopic;
