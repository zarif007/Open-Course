"use client";

import { AppDispatch } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CourseTopicsBar from "./CourseTopics.Bar";
import { IEnrollState } from "@/types/enrollState";
import { ICourseTopic } from "@/types/courseTopic";
import { ICourse } from "@/types/course";
import CourseContentsTabs from "./CourseContents.Tabs";
import canBeParsedToInt from "@/utils/canBeParsedToInt";
import {
  setCourseForView,
  setCurrentCourseTopicForView,
  setEnrollState,
} from "@/redux/features/course-view-slice";

const MODE = "view";

const isValid = (topicId: number, enrollState: IEnrollState): boolean => {
  const currentTopic = enrollState.currentTopic as ICourseTopic;

  return (
    topicId === currentTopic.topicID ||
    enrollState.finishedTopics.includes(topicId.toString())
  );
};
const CourseGuard = ({
  course,
  enrollState,
  slug,
}: {
  course: ICourse;
  enrollState: IEnrollState;
  slug: string;
}) => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();

  const topicId = searchParams?.get("topicId");

  const router = useRouter();

  useEffect(() => {
    if (
      !topicId ||
      !canBeParsedToInt(topicId) ||
      !isValid(parseInt(topicId), enrollState)
    ) {
      const currentTopic = enrollState.currentTopic as ICourseTopic;
      router.push(`/course/${slug}?topicId=${currentTopic.topicID}`);
      dispatch(
        setCurrentCourseTopicForView(course.topics[currentTopic.topicID! - 1])
      );
    } else {
      dispatch(
        setCurrentCourseTopicForView(course.topics[parseInt(topicId) - 1])
      );
    }
    setIsLoading(false);
    dispatch(setEnrollState(enrollState));
    dispatch(setCourseForView(course));
  }, [topicId, course, enrollState]);

  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
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
      )}
    </section>
  );
};

export default CourseGuard;
