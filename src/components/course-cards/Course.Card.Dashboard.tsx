"use client";

import React from "react";
import Paragraph from "../ui/Paragraph";
import { ICourse } from "@/types/course";
import SelectedTopics from "../course-details/SelectedTopics";
import { formatSelectedLevels } from "@/utils/formatSelectedLevels";
import { Button, buttonVariants } from "../ui/Button";

import { IUser } from "@/types/user";
import BlurredImage from "../ui/BlurredImage";

import Link from "next/link";
import generateBannerFromCourse from "@/utils/generateBannerFromCourse";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { ICourseTopic } from "@/types/courseTopic";
import ContentLogos from "../course-content/ContentLogos";

const CourseCardDashboard = ({
  state,
}: {
  state: {
    course: ICourse;
    currentTopic: ICourseTopic;
    completedTopic: number;
  };
}) => {
  const { course, currentTopic, completedTopic } = state;
  const creator = course.creator as IUser;

  const generatedBanner = generateBannerFromCourse(course, creator.name);

  const router = useRouter();

  return (
    <div className="p-4">
      <div className="h-full border-2 border-slate-300 dark:border-gray-800 rounded-md overflow-hidden">
        <BlurredImage
          src={course.banner === "" ? generatedBanner : course.banner}
          alt="blog"
          dimension="h-36 w-full"
          className="h-36 w-full rounded object-cover object-center border border-rose-500"
        />

        <div className="p-6 pt-2 pb-4">
          <Paragraph
            size="default"
            className="font-bold underline decoration-rose-500 decoration-2 truncate"
          >
            {course.title}
          </Paragraph>

          <div
            onClick={() =>
              router.push(
                `/course/${course.slug}?topicId=${currentTopic.topicID}`
              )
            }
            className="p-2 my-2 bg-slate-200 dark:bg-gray-900 cursor-pointer flex space-x-2 items-center rounded"
          >
            <ContentLogos topics={[currentTopic]} withDuration={false} />
            <p className="font-semibold text-sm">
              {
                currentTopic.versions[currentTopic.versions.length - 1].data
                  .title
              }
            </p>
          </div>

          <div className="flex space-x-2 justify-end font-semibold text-sm">
            <span>Completed</span>
            <span className="text-rose-500">
              {completedTopic}/{course.topics.length}
            </span>
          </div>

          <Link
            href={`/course/${course.slug}?topicId=${currentTopic.topicID}`}
            className={`${buttonVariants({
              variant: "default",
            })} w-full mt-3 font-semibold`}
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCardDashboard;
