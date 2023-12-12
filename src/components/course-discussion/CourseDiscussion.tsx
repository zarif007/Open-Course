import React, { useEffect, useState } from 'react';
import DiscussionSkeleton from '../skeletons/Discussion.Skeleton';
import DiscussionCreationForm from './DiscussionCreation.Form';
import useGetDiscussions from '@/hooks/queries/useGetDIscusssions';
import { AppDispatch, useAppSelector } from '@/redux/store';
import Discussion from './Discussion';
import { IDiscussion } from '@/types/discussion';
import { useDispatch } from 'react-redux';
import { setDiscussions } from '@/redux/features/topic-discuss-slice';

const CourseDiscussion = () => {
  const discussions = useAppSelector(
    (state) => state.discussionsReducer.value.discussions
  );

  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const dispatch = useDispatch<AppDispatch>();

  const version = currentCourseTopic.versions.length - 1;
  const topicId = currentCourseTopic.id as string;

  const { data, isLoading } = useGetDiscussions(version, topicId, 'none');

  useEffect(() => {
    if (isLoading) return;
    dispatch(setDiscussions(data));
  }, [data, isLoading]);

  const onSubmitFunction = () => {};

  return (
    <main className="w-full">
      <DiscussionCreationForm
        parentId="none"
        onSubmitFunction={onSubmitFunction}
      />
      {isLoading ? (
        <DiscussionSkeleton />
      ) : (
        <React.Fragment>
          {discussions &&
            discussions.map((discussion, index) => (
              <Discussion
                key={index}
                discussion={discussion as IDiscussion}
                level={0}
              />
            ))}
        </React.Fragment>
      )}
    </main>
  );
};

export default CourseDiscussion;
