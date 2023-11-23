import CourseReviewTaker from "@/components/course-details/CourseReviewTaker";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import { PiArrowFatLinesLeftDuotone } from "react-icons/pi";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
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
import { IEnrollState } from "@/types/enrollState";

interface PageParams {
  params: {
    slug: string;
  };
}

const getCourseAndEnrollState = async (
  slug: string,
  userEmail: string | null
): Promise<{ course: ICourse | null; enrollState: IEnrollState | null }> => {
  const data = await (
    await fetch(
      `${nextApiEndPoint}/course/withEnrollState?courseSlug=${slug}&userEmail=${userEmail}`,
      {
        cache: "no-store",
        method: "GET",
        headers: new Headers(headers()),
      }
    )
  ).json();

  return data;
};

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const { course } = await getCourseAndEnrollState(params.slug, null);

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
  const session = await getServerSession();

  const { course, enrollState } = await getCourseAndEnrollState(
    params.slug,
    session?.user?.email ?? null
  );

  if (!course) redirect("/404");

  if (!enrollState) redirect(`/course/${params.slug}`);

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
        href={`/course/${params.slug}`}
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
