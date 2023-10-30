"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/redux/store";
import axios from "axios";
import { toast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";
import { ICourse } from "@/types/course";
import createSlug from "@/utils/createSlug";
import { ICourseTopic } from "@/types/courseTopic";
import { useSession } from "next-auth/react";
import generateBannerFromCourse from "@/utils/generateBannerFromCourse";
import CourseCreationUpdate from "@/components/course-details/Course.CreationUpdate";

const MODE = "edit";

const CourseUpdate = () => {
  const [loadingStatus, setLoadingStatus] = useState<
    "free" | "Processing" | "Redirecting"
  >("free");

  const course = useAppSelector(
    (state) => state.courseUpdateReducer.value.course
  );

  const { data: session } = useSession();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const router = useRouter();

  const showErrorToast = (errorMsg: string) => {
    toast({
      title: "Complete required fields",
      type: "error",
      message: errorMsg,
    });
  };

  const validateCourseDetails = (): boolean => {
    if (!course.title) {
      showErrorToast("Title is required");
      return false;
    }
    if (course.categories.length === 0) {
      showErrorToast("Must add at least one Category");
      return false;
    }
    if (course.levels.length === 0) {
      showErrorToast("Must add at least one Level");
      return false;
    }
    if (course.languages.length === 0) {
      showErrorToast("Must add at least one Languages");
      return false;
    }
    if (course.topics.length === 1) {
      showErrorToast("Must add at least one Course Topic");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (loadingStatus !== "free" || !session?.user?.email || !signedInUser?.id)
      return;

    if (!validateCourseDetails()) return;

    setLoadingStatus("Processing");

    const courseTopics = course.topics as ICourseTopic[];

    const courseData: ICourse = {
      ...course,
      slug: course.slug ? course.slug : createSlug(course.title),
      topics: courseTopics.filter((topic) => topic.id !== 0),
      creator: signedInUser.id,
      banner:
        course.banner === ""
          ? generateBannerFromCourse(course, signedInUser.name)
          : course.banner,
    };

    try {
      const { data } = await axios.put(`api/course/${course.id}`, courseData);
      toast({
        title: "Course Updated",
        type: "success",
        message: "Course Updated Successfully",
      });
      setLoadingStatus("Redirecting");
      router.push(`course-landing/${data.data.slug}`);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        type: "error",
        message: "Something went wrong, Try again later",
      });
      setLoadingStatus("free");
    }
  };

  return (
    <CourseCreationUpdate
      MODE={MODE}
      loadingStatus={loadingStatus}
      handleSubmit={handleSubmit}
    />
  );
};

export default CourseUpdate;