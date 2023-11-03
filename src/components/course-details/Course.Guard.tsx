"use client";

import CourseTopicsBar from "../course-topic/CourseTopics.Bar";
import CourseContentsTabs from "../course-content/CourseContents.Tabs";
import CourseSkeleton from "../skeletons/Course.Skeleton";
import useCourseGuard from "@/hooks/useCourseGuard";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IEnrollState } from "@/types/enrollState";
import { ICourseTopic } from "@/types/courseTopic";
import { ICourse } from "@/types/course";
import canBeParsedToInt from "@/utils/canBeParsedToInt";
import {
  setCourseForView,
  setCurrentCourseTopicForView,
  setEnrollState,
} from "@/redux/features/course-view-slice";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { useSession } from "next-auth/react";

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
