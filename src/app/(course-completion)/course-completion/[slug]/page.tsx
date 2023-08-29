import CourseRatingTaker from "@/components/CourseRatingTaker";
import { Button } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import { PiArrowFatLinesLeftDuotone } from "react-icons/pi";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import { currentUser } from "@clerk/nextjs";
import axios from "axios";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

interface PageParams {
  params: {
    slug: string;
  };
}

const CourseCompletion = async ({ params }: PageParams) => {
  const slug = params.slug;

  const { data: CourseData } = await axios.get(
    `${v1MainEndpoint}/course/bySlug/${slug}`
  );
  const course = CourseData.data;
  if (!course) redirect("/404");

  const user = await currentUser();
  if (!user) redirect("");

  const { data: EnrollStateData } = await axios.get(
    `${v1MainEndpoint}/enrollState/?user=${user?.id}&course=${course.id}`
  );
  const enrollState = EnrollStateData.data;
  if (!enrollState) redirect(`/course/${slug}`);

  return (
    <main className="w-full max-w-5xl mx-auto h-full flex flex-col">
      <Link href={`/course/${slug}`} className="flex justify-end mb-4">
        <Button className="w-fit flex items-center space-x-2">
          <PiArrowFatLinesLeftDuotone className="w-6 h-6" />
          <span>Back to the Course</span>
        </Button>
      </Link>
      <LargeHeading className="text-rose-500 dark:text-rose-500">
        Congratulation 🎉
      </LargeHeading>
      <LargeHeading size="sm">on the Completion of</LargeHeading>
      <LargeHeading className="underline decoration-rose-500 decoration-4">
        {course.title}
      </LargeHeading>
      <CourseRatingTaker course={course} />
    </main>
  );
};

export default CourseCompletion;
