"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import Paragraph from "./ui/Paragraph";
import { ICourse } from "@/types/course";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SelectedTopics from "./SelectedTopics";
import { formatSelectedLevels } from "@/utils/formatSelectedLevels";
import { Button } from "./ui/Button";
import {
  PiChatsDuotone,
  PiRocketLaunchDuotone,
  PiShootingStarDuotone,
} from "react-icons/pi";
import { useRouter } from "next/navigation";
import Head from "next/head";

const Course = ({ course }: { course: ICourse }) => {
  const { theme } = useTheme();

  const router = useRouter();

  const { data: creator, isLoading } = useQuery({
    queryKey: ["creator", course.creator],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/getUser?userId=${course.creator}`
      );
      return data.user;
    },
  });

  const generatedBanner = `/api/generateBanner?courseName=${
    course.title
  }&theme=${theme}&
  &topics=${course.categories ? course.categories.join("  ") : ""}
  &creator=${creator?.first_name}`;

  return (
    <div className="p-4">
      <div className="h-full border-2 border-slate-300 dark:border-gray-800 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={generatedBanner}
          alt="blog"
        />
        <div className="p-6">
          {
            isLoading ? <p>lopading</p> : 
            <h2 className="tracking-widest text-xs title-font font-bold text-gray-500 mb-1">
            By{" "}
            <span className="text-rose-500">
              {creator.first_name}
            </span>
          </h2>
          }
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

          <SelectedTopics mode="view" selectedTopics={course.languages} />

          <div className="flex justify-end text-gray-500 items-center space-x-2">
            <div className="flex space-x-1 items-center">
              <PiShootingStarDuotone className="w-6 h-6" />
              <p className="font-semibold text-md">4.5</p>
            </div>
            <p className="font-semibold text-lg text-slate-300 dark:text-gray-800">
              |
            </p>
            <div className="flex space-x-1 items-center">
              <PiRocketLaunchDuotone className="w-6 h-6" />
              <p className="font-semibold text-md">
                {course.enrolledUsers.length}
              </p>
            </div>
            <p className="font-semibold text-lg text-slate-300 dark:text-gray-800">
              |
            </p>
            <div className="flex space-x-1 items-center">
              <PiChatsDuotone className="w-6 h-6" />
              <p className="font-semibold text-md">
                {course.enrolledUsers.length}
              </p>
            </div>
          </div>
          <Button
            className="w-full mt-3"
            onClick={() => router.push(`course/${course.slug}`)}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Course;
