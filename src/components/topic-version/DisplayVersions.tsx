/* eslint-disable @next/next/no-img-element */
import { ITopicVersion } from '@/types/topicVersion';
import { IUser } from '@/types/user';
import formatDate from '@/utils/formatDate';
import React from 'react';
import ContentLogos from '../course-content/ContentLogos';
import { IoMdCheckmark, IoMdClose, IoMdEye } from 'react-icons/io';
import TopicPreviewDialog from './TopicPreview.Dialog';
import { ICourseTopic } from '@/types/courseTopic';

const DisplayVersions = ({
  requestedVersions,
  currentCourseTopic,
  handleTickClick,
  handleRemoveClick,
}: {
  requestedVersions: ITopicVersion[];
  currentCourseTopic: ICourseTopic;
  handleTickClick: (version: ITopicVersion) => void;
  handleRemoveClick: (version: ITopicVersion) => void;
}) => {
  return (
    <div className="flex flex-col space-y-3">
      <div>
        <h1 className="font-bold text-xl">Requested Versions</h1>
        {requestedVersions.map((requestedVersion) => {
          const { stage } = requestedVersion;
          const author = requestedVersion.creator as IUser;
          return (
            <div
              key={requestedVersion.id}
              className="p-4 flex items-center justify-between rounded border-2 border-slate-300 dark:border-gray-900"
            >
              <div className="flex justify-start space-x-2 items-center">
                <div className="flex items-center space-x-2">
                  <ContentLogos
                    topics={[requestedVersion]}
                    withDuration={false}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-md font-semibold">
                    {requestedVersion.version.data.title}
                  </p>
                  <p className="text-xs font-semibold">{author.name}</p>
                  <p className="text-xs font-bold text-slate-400 dark:text-gray-700">
                    {formatDate(requestedVersion.updatedAt ?? '')}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 items-center">
                <TopicPreviewDialog
                  version={requestedVersion}
                  handleTickClick={handleTickClick}
                  handleRemoveClick={handleRemoveClick}
                />
                <button
                  onClick={() => handleTickClick(requestedVersion)}
                  className="p-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-600 dark:text-green-400 rounded-full transition-colors duration-200 shadow-sm hover:shadow-md"
                  title="Approve"
                >
                  <IoMdCheckmark size={18} />
                </button>
                <button
                  onClick={() => handleRemoveClick(requestedVersion)}
                  className="p-2 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-600 dark:text-red-400 rounded-full transition-colors duration-200 shadow-sm hover:shadow-md"
                  title="Remove"
                >
                  <IoMdClose size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayVersions;
