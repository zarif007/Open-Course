"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import Paragraph from "./ui/Paragraph";
import { ICourse } from "@/types/course";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SelectedTopics from "./SelectedTopics";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import SwiperComp from "./ui/SwiperComp";
import { formatSelectedLevels } from "@/utils/formatSelectedLevels";

const api = "http://localhost:3000/api";

const Course = ({ course }: { course: ICourse }) => {
  const { theme } = useTheme();

  const generatedBanner = `${api}/generateBanner?courseName=${
    course.title
  }&theme=${theme}&
  &topics=${course.categories ? course.categories.join("  ") : ""}`;

  const { data: creator, isLoading } = useQuery({
    queryKey: ["creator", course.creator],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/getUserInfo?userId=user_2ShJZNoi0qrOTzvs5kQOiI05Y0z`
      );

      return data.user;
    },
  });

  return (
    <div className="p-4">
      <div className="h-full border-2 border-slate-300 dark:border-gray-800 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={generatedBanner}
          alt="blog"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-bold text-gray-500 mb-1">
            By{" "}
            <span className="text-rose-500">
              {!isLoading && creator.firstName}
            </span>
          </h2>
          <Paragraph
            size="default"
            className="font-bold underline decoration-rose-500 decoration-2 truncate"
          >
            {course.title}
          </Paragraph>

          <SelectedTopics mode="view" selectedTopics={formatSelectedLevels(course.levels)} />

          <SelectedTopics mode="view" selectedTopics={course.languages} />

          <div className="flex items-center flex-wrap ">
            <a className="text-rose-500 inline-flex items-center md:mb-2 lg:mb-0">
              Learn More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <span className="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              1.2K
            </span>
            <span className="text-gray-500 inline-flex items-center leading-none text-sm">
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
              6
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
