import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet';
import { MdOutlineMenuOpen } from 'react-icons/md';
import CourseProgressBar from './CourseProgress.Bar';
import CourseTopics from './CourseTopics';

const CourseTopicsSheet = ({
  mode,
}: {
  mode: 'creation' | 'edit' | 'view';
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <MdOutlineMenuOpen className="w-10 h-10 text-gray-900 dark:text-slate-100" />
      </SheetTrigger>
      <SheetContent
        className="bg-slate-100 dark:bg-[#0a0a0a] border-2 border-slate-300 dark:border-gray-800 p-0 h-full overflow-y-auto"
        side="left"
      >
        <div
          className={`overflow-y-auto ${
            mode === 'view' ? 'h-[80vh]' : 'h-[88vh]'
          } mt-12`}
        >
          <CourseTopics mode={mode} />
        </div>
        {mode === 'view' && <CourseProgressBar styles="p-2 m-2" />}
      </SheetContent>
    </Sheet>
  );
};

export default CourseTopicsSheet;
