"use client";

import React, { useState } from "react";
import { AppDispatch, useAppSelector } from "@/redux/store";
import axios from "axios";
import { toast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";
import { ICourse } from "@/types/course";
import createSlug from "@/utils/createSlug";
import { ICourseTopic } from "@/types/courseTopic";
import { useSession } from "next-auth/react";
import generateBannerFromCourse from "@/utils/generateBannerFromCourse";
import CourseCreationUpdate from "@/components/course-details/Course.CreationUpdate";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { setCourseForUpdate } from "@/redux/features/course-update-slice";

const MODE = "edit";

interface PageParams {
  params: {
    slug: string;
  };
}

const CourseUpdate = ({ params }: PageParams) => {
  const [loadingStatus, setLoadingStatus] = useState<
    "free" | "Processing" | "Redirecting"
  >("free");

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const { isLoading } = useQuery({
    queryKey: [`course-${params.slug}`],
    queryFn: async () => {
      const { data } = await (
        await fetch(`${nextApiEndPoint}/course/bySlug/${params.slug}`)
      ).json();

      if (data.author !== signedInUser?.id) {
        router.push("/");
        return;
      }

      dispatch(setCourseForUpdate(data));
    },
  });

  const course = useAppSelector(
    (state) => state.courseUpdateReducer.value.course
  );

  const showErrorToast = (errorMsg: string) => {
    toast({
      title: "Complete required fields",
      type: "error",
      message: errorMsg,
    });
  };

  const validateCourseDetails = (): boolean => {
    const courseTopics = course.topics as ICourseTopic[];
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
    if (courseTopics.filter((topic) => topic.id !== 0).length === 0) {
      showErrorToast("Must add at least one Course Topic");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (loadingStatus !== "free" || !signedInUser?.id || isLoading) return;

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
      const { data } = await axios.put(
        `${nextApiEndPoint}/course/${course.id}`,
        courseData
      );
      toast({
        title: "Course Updated",
        type: "success",
        message: "Course Updated Successfully",
      });
      setLoadingStatus("Redirecting");
      router.push(`/course-landing/${data.data.slug}`);
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
    <div>
      {isLoading ? (
        <p>loading....</p>
      ) : (
        <CourseCreationUpdate
          MODE={MODE}
          loadingStatus={loadingStatus}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CourseUpdate;
