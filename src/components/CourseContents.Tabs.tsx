"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { AiOutlineFolderView } from "react-icons/ai";
import { TbMessageQuestion } from "react-icons/tb";
import CourseContent from "./CourseContent";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { useDispatch } from "react-redux";
import {
  setCurrentCourseTopicForView,
  setEnrollState,
} from "@/redux/features/course-view-slice";
import LargeHeading from "./ui/LargeHeading";
import { IEnrollState } from "@/types/enrollState";
import axios from "axios";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import { useUser } from "@clerk/nextjs";
import CourseContentFullscreenDialog from "./CourseContentFullscreen.Dialog";

const CourseContentsTabs = () => {
  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const course = useAppSelector(
    (state) => state.courseViewReducer.value.course
  );

  const router = useRouter();

  const { user } = useUser();

  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNextButton = async () => {
    if (isLoading || !user || !course || !currentCourseTopic.id) return;

    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `${v1MainEndpoint}/enrollState?user=${user?.id}&course=${course.id}`
      );

      const enrollState = data.data as IEnrollState;

      const currentCourseTopicId = currentCourseTopic.topicID as number;

      const state: IEnrollState = {
        ...enrollState,
        currentTopic: course.topics[currentCourseTopicId].id as string,
        finishedTopics: enrollState.finishedTopics.includes(
          currentCourseTopicId.toString()
        )
          ? enrollState.finishedTopics
          : [...enrollState.finishedTopics, currentCourseTopicId.toString()],
      };

      const updatedEnrollState = await axios.put(
        `${v1MainEndpoint}/enrollState`,
        state
      );

      dispatch(setEnrollState(updatedEnrollState.data.data));

      router.push(`/course/${course.slug}?topicId=${currentCourseTopicId + 1}`);

      dispatch(
        setCurrentCourseTopicForView(course.topics[currentCourseTopicId])
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoneButton = () => {};

  return (
    <Tabs defaultValue="content" className="w-full mx-auto px-2 md:px-6">
      <LargeHeading
        size="sm"
        className="text-start underline decoration-rose-500 decoration-2"
      >
        {course.title}
      </LargeHeading>
      <TabsList className="">
        <TabsTrigger
          className="font-semibold flex items-center space-x-1"
          value="content"
        >
          <AiOutlineFolderView className="w-5 h-5" />
          <span>Content</span>
        </TabsTrigger>
        <TabsTrigger
          className="font-semibold flex items-center space-x-1"
          value="discuss"
        >
          <TbMessageQuestion className="w-5 h-5" />
          <span>Discuss</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="content">
        <div className="flex justify-end">
          <CourseContentFullscreenDialog courseTopic={currentCourseTopic} />
        </div>
        <CourseContent courseTopic={currentCourseTopic} />
        <div className="mt-20 flex justify-end">
          {currentCourseTopic.topicID &&
          currentCourseTopic.topicID < course.topics.length ? (
            <Button
              className="px-12"
              onClick={handleNextButton}
              isLoading={isLoading}
            >
              Next
            </Button>
          ) : (
            <Button
              className="px-12"
              onClick={handleDoneButton}
              isLoading={isLoading}
            >
              Done
            </Button>
          )}
        </div>
      </TabsContent>
      <TabsContent value="discuss"></TabsContent>
    </Tabs>
  );
};

export default CourseContentsTabs;
