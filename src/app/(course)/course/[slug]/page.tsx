import CourseLandingPage from "@/components/course-details/CourseLanding.Page";
import CourseTopics from "@/components/course-topic/CourseTopics.Bar";
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
import { useSearchParams, useRouter, redirect } from "next/navigation";
import canBeParsedToInt from "@/utils/canBeParsedToInt";
import { currentUser, useUser } from "@clerk/nextjs";
import { IEnrollState } from "@/types/enrollState";
import { ICourseTopic } from "@/types/courseTopic";
import CourseGuard from "@/components/course-details/Course.Guard";
import { Metadata } from "next";
import { IUser } from "@/types/user";

interface PageParams {
  params: {
    slug: string;
  };
}

const getCourse = async (slug: string) => {
  const { data: courseData } = await axios.get(
    `${v1MainEndpoint}/course/bySlug/${slug}`
  );

  return courseData.data;
};

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const course: ICourse | null = await getCourse(params.slug);

  const creator = course?.creator as IUser;

  const generatedBanner = `/api/generateBanner?courseName=${
    course?.title
  }&theme=dark&
  &topics=${course?.categories ? course?.categories.join("  ") : ""}
  &creator=${creator.attributes?.first_name}`;

  return {
    title: course?.title,
    openGraph: {
      title: course?.title,
      description: course?.description,
      images: [`${generatedBanner}`],
    },
  };
};

const Course = async ({ params }: PageParams) => {
  const user = await currentUser();

  const course = await getCourse(params.slug);

  if (!course) redirect("/404");

  const { data: enrollStateData } = await axios.get(
    `${v1MainEndpoint}/enrollState?user=${user?.id}&course=${course.id}`
  );

  const enrollState = enrollStateData.data;

  if (!enrollState) redirect(`/course-landing/${params.slug}`);

  return (
    <CourseGuard course={course} enrollState={enrollState} slug={params.slug} />
  );
};

export default Course;
