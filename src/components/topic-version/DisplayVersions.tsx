/* eslint-disable @next/next/no-img-element */
import { ITopicVersion } from '@/types/topicVersion';
import { IUser } from '@/types/user';
import formatDate from '@/utils/formatDate';
import React from 'react';
import ContentLogos from '../course-content/ContentLogos';
import { IoMdCheckmark, IoMdRemove } from 'react-icons/io';
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
              <TopicPreviewDialog version={requestedVersion} />
              <button
                onClick={() => handleTickClick(requestedVersion)}
                className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors"
                title="Tick"
              >
                <IoMdCheckmark size={16} />
                <span>Tick</span>
              </button>
              <button
                onClick={() => handleRemoveClick(requestedVersion)}
                className="flex items-center space-x-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors"
                title="Remove"
              >
                <IoMdRemove size={16} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayVersions;
