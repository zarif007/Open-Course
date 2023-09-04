import CourseLandingPage from "@/components/course-details/CourseLanding.Page";
import { ICourse } from "@/types/course";
import { IUser } from "@/types/user";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import axios from "axios";
import { Metadata } from "next";
import React from "react";

interface PageParams {
  params: {
    slug: string;
  };
}

const getCourse = async (slug: string) => {
  const { data } = await axios.get(`${v1MainEndpoint}/course/bySlug/${slug}`);
  return data.data;
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
    title: `Complete-${course?.title}`,
    openGraph: {
      title: `Complete-${course?.title}`,
      description: course?.description,
      images: generatedBanner,
    },
  };
};

const CourseLanding = async ({ params }: PageParams) => {
  const course = await getCourse(params.slug);
  return <CourseLandingPage course={course} />;
};

export default CourseLanding;
