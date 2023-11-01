"use client";

import React, { useState } from "react";
import CourseTopicsBar from "../course-topic/CourseTopics.Bar";
import { ICourse } from "@/types/course";
import CourseContentsTabs from "../course-content/CourseContents.Tabs";
import CourseSkeleton from "../skeletons/Course.Skeleton";
import useCourseGuard from "@/hooks/useCourseGuard";

const MODE = "view";

const CourseGuard = ({ course, slug }: { course: ICourse; slug: string }) => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useCourseGuard(course, slug, setIsLoading);

  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      {!isLoading ? (
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
            <CourseContentsTabs />
          </div>
        </div>
      ) : (
        <CourseSkeleton />
      )}
    </section>
  );
};

export default CourseGuard;
