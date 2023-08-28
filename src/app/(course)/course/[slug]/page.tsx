"use client";

import CourseContentsTabs from "@/components/CourseContents.Tabs";
import CourseLandingPage from "@/components/CourseLanding.Page";
import CourseTopics from "@/components/CourseTopics.Bar";
import {
  setCourseForView,
  setCurrentCourseTopicForView,
  setEnrollState,
} from "@/redux/features/course-view-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ICourse } from "@/types/course";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import canBeParsedToInt from "@/utils/canBeParsedToInt";
import { useUser } from "@clerk/nextjs";
import { IEnrollState } from "@/types/enrollState";
import { ICourseTopic } from "@/types/courseTopic";

interface PageParams {
  params: {
    slug: string;
  };
}

const MODE = "view";

const isValid = (topicId: number, enrollState: IEnrollState): boolean => {
  const currentTopic = enrollState.currentTopic as ICourseTopic;

  return (
    topicId === currentTopic.topicID ||
    enrollState.finishedTopics.includes(topicId.toString())
  );
};

const Course = ({ params }: PageParams) => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);

  const [isEnrolled, setIsEnrolled] = useState<"yes" | "no" | "loading">(
    "loading"
  );

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const { user } = useUser();

  const searchParams = useSearchParams();

  const topicId = searchParams?.get("topicId");

  const course = useAppSelector(
    (state) => state.courseViewReducer.value.course
  );

  const { isLoading } = useQuery({
    queryKey: ["course", params.slug],
    queryFn: async () => {
      const { data: courseData } = await axios.get(
        `${v1MainEndpoint}/course/bySlug/${params.slug}`
      );

      const course = courseData.data;

      const { data: enrollStateData } = await axios.get(
        `${v1MainEndpoint}/enrollState?user=${user?.id}&course=${course.id}`
      );

      const enrollState = enrollStateData.data;

      return {
        course: course as ICourse,
        enrollState: enrollState,
      };
    },

    enabled: !!user?.id,

    onSuccess: (data) => {
      const { course, enrollState } = data;
      if (!enrollState) {
        router.push(`/course/${params.slug}`);

        setIsEnrolled("no");
      } else if (
        !topicId ||
        !canBeParsedToInt(topicId) ||
        !isValid(parseInt(topicId), enrollState)
      ) {
        router.push(
          `/course/${params.slug}?topicId=${enrollState.currentTopic.topicID}`
        );
        dispatch(
          setCurrentCourseTopicForView(
            course.topics[enrollState.currentTopic.topicID - 1]
          )
        );

        setIsEnrolled("yes");
      } else {
        dispatch(
          setCurrentCourseTopicForView(course.topics[parseInt(topicId) - 1])
        );

        setIsEnrolled("yes");
      }

      dispatch(setEnrollState(enrollState));
      dispatch(setCourseForView(course));
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      {isLoading || isEnrolled === "loading" ? (
        <div className="flex items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : isEnrolled === "yes" ? (
        <div className="flex">
          {/* Left */}
          <CourseTopics
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
        <CourseLandingPage course={course} />
      )}
    </section>
  );
};

export default Course;
