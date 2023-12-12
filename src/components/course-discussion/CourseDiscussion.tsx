import React from 'react';
import DiscussionSkeleton from '../skeletons/Discussion.Skeleton';
import DiscussionCreationForm from './DiscussionCreation.Form';
import useGetDiscussions from '@/hooks/queries/useGetDIscusssions';
import { useAppSelector } from '@/redux/store';
import Discussion from './Discussion';
import { IDiscussion } from '@/types/discussion';

const CourseDiscussion = () => {
  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const version = currentCourseTopic.versions.length - 1;
  const topicId = currentCourseTopic.id as string;

  const { data: discussions, isLoading } = useGetDiscussions(
    version,
    topicId,
    'none'
  );

  const onSubmitFunction = () => {};

  return (
    <main>
      <DiscussionCreationForm
        parentId="none"
        onSubmitFunction={onSubmitFunction}
      />
      {isLoading ? (
        <DiscussionSkeleton />
      ) : (
        <React.Fragment>
          {discussions && (
            <div>
              {discussions.map((discussion: IDiscussion) => (
                <Discussion
                  key={discussion.id}
                  discussion={discussion}
                  level={0}
                />
              ))}
            </div>
          )}
        </React.Fragment>
      )}
    </main>
  );
};

export default CourseDiscussion;
