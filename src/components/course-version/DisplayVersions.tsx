/* eslint-disable @next/next/no-img-element */
import { ITopicVersion } from '@/types/topicVersion';
import { IUser } from '@/types/user';
import formatDate from '@/utils/formatDate';
import React from 'react';
import ContentLogos from '../course-content/ContentLogos';

const DisplayVersions = ({ versions }: { versions: ITopicVersion[] }) => {
  return (
    <div className="flex flex-col space-y-3">
      {versions.map((version) => {
        const { stage } = version;
        const author = version.creator as IUser;
        return (
          <div
            key={version.id}
            className="p-4 cursor-pointer flex items-center justify-between rounded border-2 border-slate-300 dark:border-gray-900"
          >
            <div className="flex justify-start space-x-2 items-center">
              <div className="flex items-center space-x-1">
                {/* <ContentLogos topics={[version.version.data]} withDuration={false} /> */}
                <img
                  src={author.image}
                  alt="author"
                  className="h-8 w-8 rounded"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-xs font-semibold">{author.name}</p>
                <p className="text-xs font-bold text-slate-400 dark:text-gray-700">
                  {formatDate(version.updatedAt ?? '')}
                </p>
              </div>
            </div>
            <div
              className={`rounded-lg p-1 px-3 text-sm font-semibold ${
                stage === 'pending'
                  ? 'bg-yellow-600'
                  : stage === 'accepted'
                    ? 'bg-green-500'
                    : 'bg-red-500'
              }`}
            >
              {stage}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayVersions;
