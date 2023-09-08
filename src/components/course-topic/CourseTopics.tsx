"use client";

import React from "react";
import Paragraph from "../ui/Paragraph";
import { ICourseTopic } from "@/types/courseTopic";
import CourseTopic from "./CourseTopic";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setCurrentCourseTopicForCreation } from "@/redux/features/course-creation-slice";
import { setCurrentCourseTopicForView } from "@/redux/features/course-view-slice";
import { useRouter } from "next/navigation";

const CourseTopics = ({ mode }: { mode: "creation" | "edit" | "view" }) => {
  const course = useAppSelector((state) =>
    mode === "view"
      ? state.courseViewReducer.value.course
      : state.courseCreationReducer.value.course
  );

  const enrollState = useAppSelector(
    (state) => state.courseViewReducer.value.enrollState
  );

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const redirectToCurrentCourseTopic = (courseTopic: ICourseTopic) => {
    if (!isValidTopic(courseTopic)) return;
    router.push(`/course/${course.slug}?topicId=${courseTopic.topicID}`);
    dispatch(setCurrentCourseTopicForView(courseTopic));
  };

  const isValidTopic = (courseTopic: ICourseTopic): boolean => {
    const topicId = courseTopic.topicID as number;
    return enrollState.finishedTopics.includes(topicId.toString());
  };
  const courseTopics = course.topics as ICourseTopic[];

  return (
    <React.Fragment>
      <Paragraph className="mx-2 font-bold">Course Topics</Paragraph>
      {courseTopics.map((courseTopic: ICourseTopic, index: number) => {
        return (
          <div
            key={index}
            onClick={() =>
              mode === "view"
                ? redirectToCurrentCourseTopic(courseTopic)
                : dispatch(setCurrentCourseTopicForCreation(courseTopic))
            }
          >
            <CourseTopic index={index} courseTopic={courseTopic} mode={mode} />
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default CourseTopics;
