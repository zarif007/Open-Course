import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { MdOutlineMenuOpen } from "react-icons/md";
import CourseTopic from "./CourseTopic";
import CircleProgressBar from "./CircleProgress.Bar";
import Paragraph from "./ui/Paragraph";

const CourseTopicsSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <MdOutlineMenuOpen className="w-10 h-10 text-gray-900 dark:text-slate-100" />
      </SheetTrigger>
      <SheetContent className="bg-slate-100 dark:bg-gray-950 border-2 border-slate-300 dark:border-gray-800 p-0" side="left">
      <div className="overflow-y-auto h-[80vh] mt-12">
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
      <div className="border-2 border-slate-300 dark:border-gray-800 p-2 m-2 rounded-md flex items-center justify-center space-x-2">
        <CircleProgressBar value={.66} />
        <Paragraph className="font-semibold">6/9</Paragraph>
      </div>
      </SheetContent>
    </Sheet>
  );
};

export default CourseTopicsSheet;
