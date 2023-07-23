"use client";
import CourseTopics from "@/components/CourseTopics";
import React, { useState } from "react";

interface PageParams {
    params: {
      id: string;
    };
  }

const Course = ({ params }: PageParams) => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);

  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      <div className="flex">
        {/* Left */}
        <CourseTopics showCourseTopics={showCourseTopics} setShowCourseTopics={setShowCourseTopics} />

        {/* Right */}
        <div
          className={`${
            showCourseTopics ? "w-full md:w-9/12" : "w-full"
          }  ml-auto rounded mt-6`}
        >
          <div className="w-full max-w-5xl mx-auto">
            <div className="m-3">
            {Array(100)
              .fill(0)
              .map((elm, index) => (
                <p key={index}>{elm}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Course;
