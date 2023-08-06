"use client";
import React from "react";
import CourseTopic from "./CourseTopic";
import CourseProgressBar from "./CourseProgress.Bar";
import Paragraph from "./ui/Paragraph";
import { ICourseTopic } from "@/types/courseTopic";
import CourseTopics from "./CourseTopics";

const CourseTopicsSidebar = ({
  mode,
}: {
  mode: "creation" | "edit" | "view";
}) => {
  return (
    <div className="hidden md:inline w-3/12 fixed rounded mt-8 h-full overflow-y-auto">
      <div
        className={`overflow-y-auto ${
          mode === "view" ? "h-[65vh]" : "h-[73vh]"
        } m-4 ml-0 lg:ml-4`}
      >
        <CourseTopics mode={mode} />
      </div>
      {mode === "view" && (
        <div className="p-2 m-4 mx-4">
          <CourseProgressBar styles="" />
        </div>
      )}
    </div>
  );
};

export default CourseTopicsSidebar;
