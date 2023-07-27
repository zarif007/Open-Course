"use client";
import React, { useState } from "react";
import CourseTopics from "@/components/CourseTopics";
import CourseTopicCreation from "@/components/CourseTopicCreation";
import { ICourseTopic } from "@/types/courseTopic";
import CourseDetailsCreation from "@/components/CourseDetailsCreation";

const MODE = "creation";

const CourseCreation = () => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);
  const [courseTopics, setCourseTopics] = useState<ICourseTopic[]>([
    {
      id: "",
      title: "Example101",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
      description: "Just another example",
    },
  ]);
  const [currentCourseTopic, setCurrentCourseTopic] = useState<ICourseTopic>({
    id: "",
    title: "",
    description: "",
    url: "",
  });
  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      <CourseDetailsCreation />
      <div className="flex">
        {/* Left */}
        <CourseTopics
          courseTopics={courseTopics}
          showCourseTopics={showCourseTopics}
          setShowCourseTopics={setShowCourseTopics}
          setCurrentCourseTopic={setCurrentCourseTopic}
          mode={MODE}
        />

        {/* Right */}
        <div
          className={`${
            showCourseTopics ? "w-full md:w-9/12" : "w-full"
          }  ml-auto rounded mt-6`}
        >
          <CourseTopicCreation
            currentCourseTopic={currentCourseTopic}
            setCurrentCourseTopic={setCurrentCourseTopic}
            courseTopics={courseTopics}
            setCourseTopics={setCourseTopics}
          />
        </div>
      </div>
    </section>
  );
};

export default CourseCreation;
