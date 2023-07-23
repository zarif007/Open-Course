import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { MdOutlineMenuOpen } from "react-icons/md";
import CourseTopic from "./CourseTopic";
import Paragraph from "./ui/Paragraph";
import CourseProgressBar from "./CourseProgress.Bar";

const CourseTopicsSheet = ({ mode }: { mode: 'creation' | 'edit' | 'view' }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <MdOutlineMenuOpen className="w-10 h-10 text-gray-900 dark:text-slate-100" />
      </SheetTrigger>
      <SheetContent
        className="bg-slate-100 dark:bg-gray-950 border-2 border-slate-300 dark:border-gray-800 p-0 h-full overflow-y-auto"
        side="left"
      >
        <div className={`overflow-y-auto ${mode === 'view' ? 'h-[80vh]' : 'h-[88vh]'} mt-12`}>
          <Paragraph className="mx-2 font-bold">Course Topics</Paragraph>
          {Array(15)
            .fill(0)
            .map((elm, index) => (
              <CourseTopic
                key={index}
                index={index + 1}
                title="Https fundamentals Https fundamentals Https fundamentals Https fundamentals"
                description="Https fundamentals"
              />
            ))}
        </div>
        {
          mode === 'view' && <CourseProgressBar completed={6} outOf={9} styles="p-2 m-2" />
        }
      </SheetContent>
    </Sheet>
  );
};

export default CourseTopicsSheet;
