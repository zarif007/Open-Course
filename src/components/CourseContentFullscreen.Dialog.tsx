import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { ICourseTopic } from "@/types/courseTopic";
import CourseContent from "./CourseContent";
import { BiFullscreen } from "react-icons/bi";

const CourseContentFullscreenDialog = ({
  courseTopic,
}: {
  courseTopic: ICourseTopic;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="flex space-x-1 items-center">
        <BiFullscreen />
        <p>Full Screen</p>
      </DialogTrigger>
      <DialogContent className="bg-slate-100 dark:bg-gray-950 border-slate-300 dark:border-gray-800 max-w-7xl w-full max-h-[100vh]">
        <CourseContent courseTopic={courseTopic} />
      </DialogContent>
    </Dialog>
  );
};

export default CourseContentFullscreenDialog;
