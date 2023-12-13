/* eslint-disable @next/next/no-img-element */
import { ICourseTopic } from '@/types/courseTopic';
import { ITopicVersion } from '@/types/topicVersion';
import { getFavicon } from '@/utils/getFavicon';
import React, { ReactNode } from 'react';
import { FcDocument } from 'react-icons/fc';

const ContentLogos = ({
  topics,
  withDuration,
}: {
  topics: ICourseTopic[] | ITopicVersion[];
  withDuration: boolean;
}) => {
  const logoStyle = (
    index: number
  ) => `h-7 w-7 rounded-full border-2 border-rose-500 bg-slate-100 dark:bg-gray-950
  ${index !== 0 && '-ml-2'}`;

  const favIcon = (
    topic: ICourseTopic | ITopicVersion,
    index: number
  ): ReactNode => {
    let topicInfo = null;
    if ('versions' in topic)
      topicInfo = topic.versions[topic.versions.length - 1];
    else if ('version' in topic) topicInfo = topic.version;

    // console.log(topicInfo.type);
    if (topicInfo?.type === 'free_source_content') {
      const favIconUrl = getFavicon(topicInfo.data.source ?? '');

      return (
        <img
          src={favIconUrl}
          key={index}
          className={logoStyle(index)}
          alt="logo"
        />
      );
    } else {
      return <FcDocument key={index} className={logoStyle(index)} />;
    }
  };
  return (
    <div className="flex items-center justify-center">
      {topics.slice(0, 6).map((topic, index) => favIcon(topic, index))}
    </div>
  );
};

export default ContentLogos;
