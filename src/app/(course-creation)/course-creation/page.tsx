"use client";

import React, { useState } from "react";
import CourseTopicsBar from "@/components/CourseTopics.Bar";
import CourseTopicCreation from "@/components/CourseTopicCreation";
import CourseDetailsCreation from "@/components/CourseDetailsCreation";

const MODE = "creation";

const CourseCreation = () => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);
  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      <div className="flex">
        {/* Left */}
        <CourseTopicsBar
          showCourseTopics={showCourseTopics}
          setShowCourseTopics={setShowCourseTopics}
          mode={MODE}
        />

        {/* Right */}
        <div
          className={`${
            showCourseTopics ? "w-full md:w-9/12" : "w-full"
          }  ml-auto rounded mt-6`}
        >
          <CourseDetailsCreation />
          <CourseTopicCreation />
        </div>
      </div>
    </section>
  );
};

export default CourseCreation;
