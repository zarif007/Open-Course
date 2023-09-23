"use client";

import React, { useState } from "react";
import CourseTopicsBar from "@/components/course-topic/CourseTopics.Bar";
import CourseTopicCreation from "@/components/course-topic/CourseTopicCreation";
import CourseDetailsCreation from "@/components/course-details/CourseDetailsCreation";
import { useAppSelector } from "@/redux/store";
import { Button } from "@/components/ui/Button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";
import { ICourse } from "@/types/course";
import createSlug from "@/utils/createSlug";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useDispatch } from "react-redux";
import { ICourseTopic } from "@/types/courseTopic";

const MODE = "creation";

const CourseCreation = () => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);

  const [loadingStatus, setLoadingStatus] = useState<
    "free" | "Processing" | "Redirecting"
  >("free");

  const [error, setError] = useState<string>("");

  const course = useAppSelector(
    (state) => state.courseCreationReducer.value.course
  );

  const { user } = useUser();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const router = useRouter();

  const validateCourseDetails = (): boolean => {
    if (!course.title) {
      setError("Title is required");
      return false;
    }
    if (course.categories.length === 0) {
      setError("Must add at least one Category");
      return false;
    }
    if (course.levels.length === 0) {
      setError("Must add at least one Level");
      return false;
    }
    if (course.languages.length === 0) {
      setError("Must add at least one Languages");
      return false;
    }
    if (course.topics.length === 1) {
      setError("Must add at least one Course Topic");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (loadingStatus !== "free" || !user?.id || !signedInUser?.id) return;

    if (!validateCourseDetails()) return;

    setLoadingStatus("Processing");

    const courseTopics = course.topics as ICourseTopic[];

    const courseData: ICourse = {
      ...course,
      slug: course.slug ? course.slug : createSlug(course.title),
      topics: courseTopics.filter((topic) => topic.id !== 0),
      creator: signedInUser.id,
    };

    try {
      const { data } = await axios.post(`api/course`, courseData);
      toast({
        title: "Course Created",
        type: "success",
        message: "Course Created Successfully",
      });
      setLoadingStatus("Redirecting");
      router.push(`course-landing/${data.data.slug}`);
    } catch (error) {
      toast({
        title: "Error",
        type: "error",
        message: "Something went wrong, Try again later",
      });
      setLoadingStatus("free");
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

          <ErrorMessage
            text={error}
            className="font-bold flex items-center justify-center text-xl"
          />

          <div className="flex justify-center p-3 md:p-6 mt-20 md:mt-28">
            <Button
              variant="general"
              className="px-12 py-6 w-full mx-0"
              onClick={handleSubmit}
              isLoading={loadingStatus !== "free"}
            >
              {loadingStatus !== "free"
                ? loadingStatus
                : "Done Creating Course?"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCreation;
