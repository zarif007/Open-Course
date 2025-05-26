import React, { ReactNode } from 'react';
import { getFavicon } from '@/utils/getFavicon';
import { ICourseTopic } from '@/types/courseTopic';
import { FcDocument } from 'react-icons/fc';
import Paragraph from '../ui/Paragraph';

const CourseTopicsList = ({
  courseTopics,
}: {
  courseTopics: ICourseTopic[];
}) => {
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

  return (
    <div className="mb-8 space-y-3">
      {courseTopics.map((topic, index: number) => {
        const currentVersion = topic.versions[topic.versions.length - 1];

        return (
          <div
            key={index}
            className="group flex items-center space-x-4 m-2 md:m-4 p-4 border border-slate-300 dark:border-gray-800 transition-all duration-200 bg-slate-100 dark:bg-gray-950"
          >
            {' '}
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
      })}
    </div>
  );
};

export default CourseTopicsList;
