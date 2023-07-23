'use client'
import React from "react";
import CourseTopic from "./CourseTopic";
import CircleProgressBar from "./CircleProgress.Bar";
import Paragraph from "./ui/Paragraph";


const CourseTopicsSidebar = () => {
  return (
    <div className={`hidden md:inline w-3/12 fixed rounded mt-8 min-h-screen`}>
      <div className="overflow-y-auto h-[70vh] m-4 ml-0 lg:ml-4">
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
      <div className="border-2 border-slate-300 dark:border-gray-800 p-2 m-4 mx-6 rounded-md flex items-center justify-center space-x-2">
        <CircleProgressBar value={.66} />
        <Paragraph className="font-semibold">6/9</Paragraph>
      </div>
    </div>
  );
};

export default CourseTopicsSidebar;
