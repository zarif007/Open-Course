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

interface PageParams {
  params: {
    slug: string;
  };
}

const MODE = "view";

const Course = ({ params }: PageParams) => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading } = useQuery({
    queryKey: ["course", params.slug],
    queryFn: async () => {
      const { data } = await axios.get(`${v1MainEndpoint}/course/bySlug/${params.slug}`);
      return data.data as ICourse;
    },
    onSuccess: (data) => {
      console.log(data)
      dispatch(setCourseForView(data));
      dispatch(setCurrentCourseTopicForView(data.topics[0]))
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const isEnrolled = true;

  
  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        isEnrolled ? <div className="flex">
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
