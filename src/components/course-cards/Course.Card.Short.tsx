"use client";

import React from "react";
import Paragraph from "../ui/Paragraph";
import { ICourse } from "@/types/course";
import SelectedTopics from "../course-details/SelectedTopics";
import { formatSelectedLevels } from "@/utils/formatSelectedLevels";
import { Button, buttonVariants } from "../ui/Button";
import { IUser } from "@/types/user";
import BlurredImage from "../ui/BlurredImage";
import courseDurationCalculator from "@/utils/courseDurationCalculator";
import Link from "next/link";
import generateBannerFromCourse from "@/utils/generateBannerFromCourse";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";

const CourseCardShort = ({ course }: { course: ICourse }) => {
  const creator = course.creator as IUser;

  const generatedBanner = generateBannerFromCourse(course, creator.name);

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

          <SelectedTopics
            mode="view"
            selectedTopics={formatSelectedLevels(course.levels)}
          />

          <div
            className="w-full max-w-5xl mx-auto"
            style={{
              borderTop: "2px dashed #f43f5e",
            }}
          />

          <div className="flex space-x-1 items-center">
            {course.categories.map((category) => (
              <PopoverComponent
                key={category}
                topic={category}
                routerName="categories"
                trigger={
                  <SelectedTopics
                    mode="view"
                    selectedTopics={[category.split(" ")[0]]}
                  />
                }
              />
            ))}
          </div>

          <Link
            href={`/course-landing/${course.slug}`}
            className={`${buttonVariants({
              variant: "default",
            })} w-full mt-3 font-semibold`}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

const PopoverComponent = ({
  topic,
  routerName,
  trigger,
}: {
  topic: string;
  routerName: string;
  trigger: React.JSX.Element;
}) => {
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">{trigger}</PopoverTrigger>
      <PopoverContent>
        <p className="font-semibold mb-3">{topic}</p>
        <Button
          className="px-2 w-full focus:ring-0"
          onClick={() => router.push(`/courses?${routerName}=${topic}`)}
        >
          View {topic.split(" ")[0]} Courses
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default CourseCardShort;
