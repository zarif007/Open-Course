"use client";
import React, { useState } from "react";
import CourseTopics from '@/components/CourseTopics';
import CourseTopicCreation from "@/components/CourseTopicCreation";

const MODE = 'creation';

const CourseCreation = () => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);

  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      
      <div className="flex">
        {/* Left */}
        <CourseTopics showCourseTopics={showCourseTopics} setShowCourseTopics={setShowCourseTopics} mode={MODE} />

        {/* Right */}
        <div
          className={`${
            showCourseTopics ? "w-full md:w-9/12" : "w-full"
          }  ml-auto rounded mt-6`}
        >
          <CourseTopicCreation />
        </div>
      </div>
    </section>
  );
};

export default CourseCreation;
