import { ICourse } from "@/types/course";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import axios from "axios";
import React from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import CourseGuard from "@/components/course-details/Course.Guard";
import { Metadata } from "next";
import { IUser } from "@/types/user";
import { IEnrollState } from "@/types/enrollState";

interface PageParams {
  params: {
    slug: string;
  };
}

const getCourse = async (
  slug: string,
  userId: string | null
): Promise<{ course: ICourse | null; enrollState: IEnrollState | null }> => {
  const data = await (
    await fetch(
      `${nextApiEndPoint}/course/withEnrollState?courseSlug=${slug}&userId=${userId}`,
      {
        cache: "no-store",
      }
    )
  ).json();

  return data;
};

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const { course } = await getCourse(params.slug, null);

  if (!course) {
    return {
      title: "Open Course",
      openGraph: {
        title: "Open Course",
        description: "Create & Enroll free courses",
      },
    };
  }

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

  if (!user?.id) redirect(`/course-landing/${params.slug}`);

  const { course, enrollState } = await getCourse(params.slug, user?.id);

  console.log(course, enrollState);

  if (!course) redirect("/404");

  if (!enrollState) redirect(`/course-landing/${params.slug}`);

  return (
    <CourseGuard course={course} enrollState={enrollState} slug={params.slug} />
  );
};

export default Course;
