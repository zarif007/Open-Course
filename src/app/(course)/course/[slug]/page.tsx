"use client";
import CourseContents from "@/components/CourseContents";
import CourseContentsTabs from "@/components/CourseContents.Tabs";
import CourseDetails from "@/components/CourseDetails";
import CourseLandingPage from "@/components/CourseLanding.Page";
import CourseTopics from "@/components/CourseTopics.Bar";
import { setCourseForView, setCurrentCourseTopicForView } from "@/redux/features/course-view-slice";
import { AppDispatch } from "@/redux/store";
import { ICourse } from "@/types/course";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useRouter  } from 'next/navigation'
import canBeParsedToInt from "@/utils/canBeParsedToInt";
import { useUser } from "@clerk/nextjs";

interface PageParams {
  params: {
    slug: string;
  };
}

const MODE = "view";

const isValid = (topicId: number, finishedTopics: string[], length: number): boolean => {
  // check from the finishedId array

  return topicId <= length
}

const Course = ({ params }: PageParams) => {

  const [showCourseTopics, setShowCourseTopics] = useState(true);

  const [isEnrolled, setIsEnrolled] = useState<'yes' | 'no' | 'loading'>('loading');

  const dispatch = useDispatch<AppDispatch>();

  const { user } = useUser()

  const searchParams = useSearchParams()

  const router = useRouter();
 
  const topicId = searchParams?.get('topicId')

  const { isLoading } = useQuery({
    queryKey: ["course", params.slug],
    queryFn: async () => {
      
      const { data } = await axios.get(`${v1MainEndpoint}/course/bySlug/${params.slug}`);
      
      const enrollState = await axios.get(`${v1MainEndpoint}/enrollState?user=${user?.id}&course=${data.data.id}`);

      return {
        course: data.data as ICourse,
        enrollState: enrollState.data,
      }
    },

    enabled: !!user?.id,

    onSuccess: (data) => {
      const { course, enrollState } = data;
      if(!enrollState.data) {
        router.push(`/course/${params.slug}`)

        setIsEnrolled('no')
      } else if(!topicId || !canBeParsedToInt(topicId) || !isValid(
        parseInt(topicId), enrollState.finishedTopics, course.topics.length)) {
        
        // update in enroll state db
        router.push(`/course/${params.slug}?topicId=${enrollState.data.currentTopic.topicID}`)
        dispatch(setCurrentCourseTopicForView(course.topics[enrollState.data.currentTopic.topicID - 1]))

        setIsEnrolled('yes')
      } else {
        // update in enroll state db
        dispatch(setCurrentCourseTopicForView(course.topics[parseInt(topicId) - 1]))

        setIsEnrolled('yes')
      }

      dispatch(setCourseForView(course));
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      {(isLoading || isEnrolled === 'loading') ? (
        <div className="flex items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        isEnrolled === 'yes' ? <div className="flex">
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
        </div> : <CourseLandingPage />
      )}
    </section>
  );
};

export default Course;
