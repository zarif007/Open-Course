'use client'
import React from "react";
import CourseTopic from "./CourseTopic";
import CourseProgressBar from "./CourseProgress.Bar";
import Paragraph from "./ui/Paragraph";


const CourseTopicsSidebar = ({ mode }: { mode: 'creation' | 'edit' | 'view' }) => {
  return (
    <div className={`hidden md:inline w-3/12 fixed rounded mt-8 min-h-screen`}>
      <div className={`overflow-y-auto ${mode === 'view' ? 'h-[70vh]' : 'h-[78vh]'} m-4 ml-0 lg:ml-4`}>
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
        mode === 'view' && <CourseProgressBar completed={6} outOf={11} styles="p-2 m-4 mx-6" />
      }
    </div>
  );
};

export default CourseTopicsSidebar;
