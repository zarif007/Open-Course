import { ICourse } from "@/types/course";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import axios from "axios";
import React from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
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
    `${nextApiEndPoint}/course/bySlug/${slug}`
  );

  return courseData.data;
};

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const course: ICourse | null = await getCourse(params.slug);

  const creator = course?.creator as IUser;

  const generatedBanner = `https://open-course.vercel.app/api/generateBanner?courseName=${
    course?.title
  }&theme=dark&
  &topics=${course?.categories ? course?.categories.join("  ") : ""}
  &creator=${creator.attributes?.first_name}`;

  return {
    title: course?.title,
    openGraph: {
      title: course?.title,
      description: course?.description,
      images: generatedBanner,
    },
  };
};

const Course = async ({ params }: PageParams) => {
  const user = await currentUser();

  const course = await getCourse(params.slug);

  if (!course) redirect("/404");

  const { data: enrollStateData } = await axios.get(
    `${nextApiEndPoint}/enrollState?user=${user?.id}&course=${course.id}`
  );

  const enrollState = enrollStateData.data;

  if (!enrollState) redirect(`/course-landing/${params.slug}`);

  return (
    <CourseGuard course={course} enrollState={enrollState} slug={params.slug} />
  );
};

export default Course;
