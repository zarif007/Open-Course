import CourseLandingPage from "@/components/course-details/CourseLanding.Page";
import { ICourse } from "@/types/course";
import { IEnrollState } from "@/types/enrollState";
import { IUser } from "@/types/user";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

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
      description: "Curate, Create & Share",
      openGraph: {
        title: "Open Course",
        description: "Create & Enroll free courses",
        images: "/whatisit-dark.png",
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

const CourseLanding = async ({ params }: PageParams) => {
  const user = await currentUser();
  const { course, enrollState } = await getCourse(
    params.slug,
    user?.id ?? null
  );

  if (!course) redirect("/404");

  return <CourseLandingPage course={course} enrollState={enrollState} />;
};

export default CourseLanding;
