import CourseLandingPage from "@/components/course-details/CourseLanding.Page";
import { store } from "@/redux/store";
import { ICourse } from "@/types/course";
import { IEnrollState } from "@/types/enrollState";
import { IUser } from "@/types/user";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import constructMetadata from "@/utils/constructMetadata";
import generateBannerFromCourse from "@/utils/generateBannerFromCourse";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
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
    return constructMetadata();
  }

  const generatedBanner = generateBannerFromCourse(course);

  return constructMetadata({
    title: course?.title,
    description: course?.description,
    image: generatedBanner,
  });
};

const CourseLanding = async ({ params }: PageParams) => {
  const session = await getServerSession();
  const { course, enrollState } = await getCourse(
    params.slug,
    session?.user?.email ?? null
  );

  if (!course) redirect("/404");

  return <CourseLandingPage course={course} enrollState={enrollState} />;
};

export default CourseLanding;
