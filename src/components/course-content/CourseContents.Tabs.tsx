"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { TbMessageQuestion } from "react-icons/tb";
import LargeHeading from "../ui/LargeHeading";
import { BiSolidUpvote } from "react-icons/bi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import CourseDiscussion from "../course-discussion/CourseDiscussion";
import CourseAsks from "../course-ask/CourseAsks";
import CourseContentController from "./CourseContent.Controller";
import { useAppSelector } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const tabElements = [
  {
    name: "Content",
    value: "content",
    icon: <MdOutlineVideoLibrary className="w-5 h-5" />,
  },
  {
    name: "Discuss",
    value: "discuss",
    icon: <TbMessageQuestion className="w-5 h-5" />,
  },
  {
    name: "Ask",
    value: "ask",
    icon: <BiSolidUpvote className="w-5 h-5" />,
  },
];

const CourseContentsTabs = () => {
  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const router = useRouter();

  const searchParams = useSearchParams();
  const tab = searchParams?.get("tab");

  const currentTab: string = tab ?? "content";

  return (
    <Tabs defaultValue={currentTab} className="w-full mx-auto px-2 md:px-6">
      <LargeHeading
        size="sm"
        className="mt-1 text-start underline decoration-rose-500 decoration-2 bg-slate-300 dark:bg-gray-800 p-3 px-4 rounded"
      >
        {currentCourseTopic.topicID}.{" "}
        {
          currentCourseTopic.versions[currentCourseTopic.versions.length - 1]
            .title
        }
      </LargeHeading>
      <TabsList className="mt-4">
        {tabElements.map((element) => (
          <TabsTrigger
            key={element.name}
            className="font-semibold flex items-center space-x-1"
            value={element.value}
            onClick={() =>
              router.push(
                `?topicId=${currentCourseTopic.topicID}&tab=${element.value}`
              )
            }
          >
            {element.icon}
            <span>{element.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="content">
        <CourseContentController />
      </TabsContent>
      <TabsContent value="discuss">
        <CourseDiscussion />
      </TabsContent>
      <TabsContent value="ask">
        <CourseAsks />
      </TabsContent>
    </Tabs>
  );
};

export default CourseContentsTabs;
