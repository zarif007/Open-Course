import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import { MdOutlinePreview } from 'react-icons/md';
import { ITopicVersion } from '@/types/topicVersion';
import CourseContent from '../course-content/CourseContent';

const TopicPreviewDialog = ({ version }: { version: ITopicVersion }) => {
  return (
    <Dialog>
      <DialogTrigger className="flex space-x-1 items-center w-full">
        <MdOutlinePreview className="w-8 h-8 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="mx-auto p-0 border-0 h-fit w-full">
        <div className="p-4">
          <CourseContent content={version.version.data} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopicPreviewDialog;
