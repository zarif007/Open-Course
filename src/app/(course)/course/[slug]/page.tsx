import { ICourse } from "@/types/course";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import axios from "axios";
import React from "react";
import { redirect } from "next/navigation";
import CourseGuard from "@/components/course-details/Course.Guard";
import { Metadata } from "next";
import { IUser } from "@/types/user";

interface PageParams {
  params: {
    slug: string;
  };
}

const getCourse = async (slug: string) => {
  const { data: courseData } = await (
    await fetch(`${nextApiEndPoint}/course/bySlug/${slug}`, {
      next: {
        revalidate: 600,
      },
    })
  ).json();

  return courseData;
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
  &creator=${creator.name}`;

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
  const course = await getCourse(params.slug);

  if (!course) redirect("/404");

  return <CourseGuard course={course} slug={params.slug} />;
};

export default Course;
