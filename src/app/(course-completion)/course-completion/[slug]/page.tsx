import CourseReviewTaker from "@/components/course-details/CourseReviewTaker";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import { PiArrowFatLinesLeftDuotone } from "react-icons/pi";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import axios from "axios";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import { ICourse } from "@/types/course";
import { IUser } from "@/types/user";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import constructMetadata from "@/utils/constructMetadata";
import generateBannerFromCourse from "@/utils/generateBannerFromCourse";
import { headers } from "next/headers";

interface PageParams {
  params: {
    slug: string;
  };
}

const getCourse = async (slug: string) => {
  const { data: courseData } = await (
    await fetch(`${nextApiEndPoint}/course/bySlug/${slug}`, {
      cache: "force-cache",
      method: "GET",
      headers: new Headers(headers()),
    })
  ).json();

  return courseData;
};

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const course: ICourse | null = await getCourse(params.slug);

  if (!course) {
    return constructMetadata();
  }

  const creator = course.creator as IUser;

  const generatedBanner = generateBannerFromCourse(course, creator.name);

  return constructMetadata({
    title: course?.title,
    description: course?.description,
    image: generatedBanner,
  });
};

const CourseCompletion = async ({ params }: PageParams) => {
  const slug = params.slug;

  const course = await getCourse(slug);

  if (!course) redirect("/404");

  const session = await getServerSession();
  if (!session?.user) redirect("");

  const { data: user } = await (
    await fetch(`${nextApiEndPoint}/user/byEmail/${session.user.email}`, {
      cache: "force-cache",
    })
  ).json();

  console.log(user);

  const { data: enrollState } = await (
    await fetch(
      `${nextApiEndPoint}/enrollState?user=${user.id}&course=${course.id}`,
      {
        cache: "no-store",
      }
    )
  ).json();

  console.log(enrollState);

  if (!enrollState) redirect(`/course/${slug}`);

  return (
    <main className="w-full max-w-5xl mx-auto h-full flex flex-col">
      <LargeHeading className="text-rose-500 dark:text-rose-500">
        Congratulation 🎉
      </LargeHeading>
      <LargeHeading size="sm">on the Completion of</LargeHeading>
      <LargeHeading className="underline decoration-rose-500 decoration-4">
        {course.title}
      </LargeHeading>
      <CourseReviewTaker course={course} />
      <Link
        href={`/course/${slug}`}
        className={`${buttonVariants({
          variant: "default",
        })} mx-auto w-[80%] md:w-[50%] flex items-center space-x-2`}
      >
        <PiArrowFatLinesLeftDuotone className="w-6 h-6" />
        <span>Back to the Course</span>
      </Link>
    </main>
  );
};

export default CourseCompletion;
