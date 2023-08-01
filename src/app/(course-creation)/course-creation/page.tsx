"use client";

import React, { useState } from "react";
import CourseTopicsBar from "@/components/CourseTopics.Bar";
import CourseTopicCreation from "@/components/CourseTopicCreation";
import CourseDetailsCreation from "@/components/CourseDetailsCreation";
import { useAppSelector } from "@/redux/store";
import { Button } from "@/components/ui/Button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import { toast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";

const MODE = "creation";

const CourseCreation = () => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const course = useAppSelector(
    (state) => state.courseCreationReducer.value.course
  );

  const { user } = useUser();

  const router = useRouter();

  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const courseData = {
      ...course,
      topics: course.topics.filter((topic) => topic.id !== 0),
      creator: {
        id: user?.id,
        fullName: user?.fullName,
        imageUrl: user?.imageUrl,
        email: user?.emailAddresses[0].emailAddress,
      },
      banner: `https://open-course.vercel.app/api/generateBanner?courseName=${course.title}&creator=${course.creator.fullName}
      &topics=${course.topics.join('')}`,
    };
    try {
      const { data } = await axios.post(`${v1MainEndpoint}/course`, courseData);
      toast({
        title: "Course Created",
        type: "success",
        message: "Course Created Successfully",
      });
      router.push(`course/${data.data.id}`);
    } catch (error) {
      toast({
        title: "Error",
        type: "error",
        message: "Something went wrong, Try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
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
          <CourseDetailsCreation />

          <CourseTopicCreation />

          <div className="flex justify-center p-3 md:p-6 mt-12 md:mt-20">
            <Button
              variant="general"
              className="px-12 py-6 w-full md:w-[75%] mx-0"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              {isLoading ? "Creating..." : "Done Creating Course?"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCreation;
