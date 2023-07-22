'use client'
import React, {useState} from "react";
import CourseTopic from "./CourseTopic";


const CourseTopicsSidebar = () => {
  return (
    <div className={`w-3/12 fixed rounded mt-8`}>
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
      <div className="border-2 border-blue-700 p-2 m-4 mx-6 rounded-md">
        Hii
      </div>
    </div>
  );
};

export default CourseTopicsSidebar;
