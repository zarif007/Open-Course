import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import { IoMdEye, IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { ITopicVersion } from '@/types/topicVersion';
import CourseContent from '../course-content/CourseContent';

const TopicPreviewDialog = ({
  version,
  children,
  handleTickClick,
  handleRemoveClick,
}: {
  version: ITopicVersion;
  children?: React.ReactNode;
  handleTickClick: (version: ITopicVersion) => void;
  handleRemoveClick: (version: ITopicVersion) => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <button
            className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400 rounded-full transition-colors duration-200 shadow-sm hover:shadow-md"
            title="Preview"
          >
            <IoMdEye size={18} />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] p-0 border-0 bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col h-full max-h-[85vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Preview Version
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {version.version.data.title}
              </p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-950">
            <CourseContent content={version.version.data} />
          </div>

          <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            {handleRemoveClick && (
              <button
                onClick={() => handleRemoveClick(version)}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-400 rounded-md transition"
              >
                <IoMdClose />
                Remove
              </button>
            )}
            {handleTickClick && (
              <button
                onClick={() => handleTickClick(version)}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-green-600 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-400 rounded-md transition"
              >
                <IoMdCheckmark />
                Approve
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopicPreviewDialog;
