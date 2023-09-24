"use client";

import { AppDispatch } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CourseTopicsBar from "../course-topic/CourseTopics.Bar";
import { IEnrollState } from "@/types/enrollState";
import { ICourseTopic } from "@/types/courseTopic";
import { ICourse } from "@/types/course";
import canBeParsedToInt from "@/utils/canBeParsedToInt";
import {
  setCourseForView,
  setCurrentCourseTopicForView,
  setEnrollState,
} from "@/redux/features/course-view-slice";
import CourseContentsTabs from "../course-content/CourseContents.Tabs";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { useUser } from "@clerk/nextjs";

const MODE = "view";

const isValid = (topicId: number, enrollState: IEnrollState): boolean => {
  const currentTopic = enrollState.currentTopic as ICourseTopic;

  return (
    topicId === currentTopic.topicID ||
    enrollState.finishedTopics.includes(topicId.toString())
  );
};

const CourseGuard = ({ course, slug }: { course: ICourse; slug: string }) => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();

  const topicId = searchParams?.get("topicId");

  const router = useRouter();

  const { user } = useUser();

  const actionBasedOnEnrollState = async () => {
    try {
      const { data: enrollState } = await (
        await fetch(
          `${nextApiEndPoint}/enrollState?user=${user?.id}&course=${course.id}`
        )
      ).json();

      if (!enrollState) {
        router.push(`/course-landing/${slug}`);
      } else {
        const courseTopics = course.topics as ICourseTopic[];
        if (
          !topicId ||
          !canBeParsedToInt(topicId) ||
          !isValid(parseInt(topicId), enrollState)
        ) {
          const currentTopic = enrollState.currentTopic as ICourseTopic;
          router.push(`/course/${slug}?topicId=${currentTopic.topicID}`);
          dispatch(
            setCurrentCourseTopicForView(
              courseTopics[currentTopic.topicID! - 1]
            )
          );
        } else {
          dispatch(
            setCurrentCourseTopicForView(courseTopics[parseInt(topicId) - 1])
          );
        }
        setIsLoading(false);

        dispatch(setEnrollState(enrollState));

        dispatch(setCourseForView(course));
      }
    } catch {
      router.push(`/course-landing/${slug}`);
    }
  };

  useEffect(() => {
    if (!user?.id) {
      router.push(`/course-landing/${slug}`);
    } else {
      actionBasedOnEnrollState();
    }
  }, [topicId, course, user]);

  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      {!isLoading && (
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
