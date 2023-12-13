import { IDiscussion } from '@/types/discussion';
import React, { useState } from 'react';
import Discussion from './Discussion';
import { useAppSelector } from '@/redux/store';
import useGetDiscussions from '@/hooks/queries/useGetDIscusssions';
import axios from 'axios';
import { nextApiEndPoint } from '@/utils/apiEndpoints';

const LoadNextDiscuss = ({ parentId }: { parentId: string }) => {
  const [status, setStatus] = useState<'free' | 'loading' | 'done'>('free');
  const [discussions, setDiscussions] = useState<IDiscussion[]>([]);

  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const version = currentCourseTopic.versions.length - 1;
  const topicId = currentCourseTopic.id as string;

  const loadDiscussions = async () => {
    if (status !== 'free') return;

    setStatus('loading');

    const { data } = await axios.get(
      `${nextApiEndPoint}/discussion?topicId=${topicId}&version=${version}&parentId=${parentId}`
    );
    setDiscussions(data.data);

    setStatus('done');
  };

  return (
    <div>
      {status !== 'done' ? (
        <p
          onClick={() => (status === 'free' ? loadDiscussions() : {})}
          className={`text-sm cursor-pointer font-semibold text-slate-300 dark:text-gray-700 my-1 ${
            status === 'free' && 'cursor-pointer'
          }`}
        >
          {status === 'free' ? 'Load comments' : 'Loading...'}
        </p>
      ) : (
        <div>
          {discussions &&
            discussions.map((discussion, index) => (
              <Discussion
                key={index}
                discussion={discussion as IDiscussion}
                level={0}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default LoadNextDiscuss;
