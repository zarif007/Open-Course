"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { TbMessageQuestion } from "react-icons/tb";
import CourseContent from "./CourseContent";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { useDispatch } from "react-redux";
import {
  setCurrentCourseTopicForView,
  setEnrollState,
} from "@/redux/features/course-view-slice";
import LargeHeading from "../ui/LargeHeading";
import { IEnrollState } from "@/types/enrollState";
import axios from "axios";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { useUser } from "@clerk/nextjs";
import { toast } from "../ui/Toast";
import { BiSolidUpvote } from "react-icons/bi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { ICourseTopic } from "@/types/courseTopic";
import CourseDiscussion from "../course-discussion/CourseDiscussion";

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

  const updateEnrollState = async (nextTopicId: number) => {
    const { data } = await axios.get(
      `${nextApiEndPoint}/enrollState?user=${user?.id}&course=${course.id}`
    );

    const enrollState = data.data as IEnrollState;

    const currentCourseTopicId = currentCourseTopic.topicID as number;

    const courseTopics = course.topics as ICourseTopic[];

    const state: IEnrollState = {
      ...enrollState,
      currentTopic: courseTopics[nextTopicId - 1].id as string,
      finishedTopics: enrollState.finishedTopics.includes(
        currentCourseTopicId.toString()
      )
        ? enrollState.finishedTopics
        : [...enrollState.finishedTopics, currentCourseTopicId.toString()],
    };

    const updatedEnrollState = await axios.put(
      `${nextApiEndPoint}/enrollState`,
      state
    );

    dispatch(setEnrollState(updatedEnrollState.data.data));

    dispatch(setCurrentCourseTopicForView(courseTopics[nextTopicId - 1]));
  };

  const handleNextButton = async () => {
    if (isLoading || !user || !course || !currentCourseTopic.id) return;

    setIsLoading(true);

    try {
      const nextTopicId = (currentCourseTopic.topicID as number) + 1;

      await updateEnrollState(nextTopicId);

      router.push(`/course/${course.slug}?topicId=${nextTopicId}`);
    } catch (error) {
      toast({
        title: "Error",
        message: `Something went wrong`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoneButton = async () => {
    if (isLoading || !user || !course || !currentCourseTopic.id) return;

    setIsLoading(true);

    try {
      const nextTopicId = 1;

      await updateEnrollState(nextTopicId);

      toast({
        title: "Success",
        message: `Course completed successfully`,
        type: "success",
      });
      router.push(`/course-completion/${course.slug}`);
    } catch (error) {
      toast({
        title: "Error",
        message: `Something went wrong`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="content" className="w-full mx-auto px-2 md:px-6">
      <LargeHeading
        size="sm"
        className="mt-1 text-start underline decoration-rose-500 decoration-2 bg-slate-300 dark:bg-gray-800 p-3 px-4 rounded"
      >
        {course.title}
      </LargeHeading>
      <TabsList className="">
        <TabsTrigger
          className="font-semibold flex items-center space-x-1"
          value="content"
        >
          <MdOutlineVideoLibrary className="w-5 h-5" />
          <span>Content</span>
        </TabsTrigger>
        <TabsTrigger
          className="font-semibold flex items-center space-x-1"
          value="discuss"
        >
          <TbMessageQuestion className="w-5 h-5" />
          <span>Discuss</span>
        </TabsTrigger>
        <TabsTrigger
          className="font-semibold flex items-center space-x-1"
          value="ask"
        >
          <BiSolidUpvote className="w-5 h-5" />
          <span>Ask</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="content">
        <CourseContent courseTopic={currentCourseTopic} />
        <div className="mt-28 flex justify-end">
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
      <TabsContent value="discuss">
        <CourseDiscussion
          courseId={course.id}
          topicId={currentCourseTopic.id as string}
        />
      </TabsContent>
      <TabsContent value="ask"></TabsContent>
    </Tabs>
  );
};

export default CourseContentsTabs;
