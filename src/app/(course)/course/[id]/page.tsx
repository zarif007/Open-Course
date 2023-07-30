"use client";
import CourseContents from "@/components/CourseContents";
import CourseDetails from "@/components/CourseDetails";
import CourseTopics from "@/components/CourseTopics.Bar";
import { setCourse } from "@/redux/features/course-view-slice";
import { AppDispatch } from "@/redux/store";
import { ICourse } from "@/types/course";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface PageParams {
  params: {
    id: string;
  };
}

const MODE = "view";

const Course = ({ params }: PageParams) => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading } = useQuery({
    queryKey: ["course", params.id],
    queryFn: async () => {
      const { data } = await axios.get(`${v1MainEndpoint}/course/${params.id}`);
      return data.data as ICourse;
    },
    onSuccess: (data) => {
      dispatch(setCourse(data));
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
            <CourseDetails />
            <CourseContents />
          </div>
        </div>
      )}
    </section>
  );
};

export default Course;
