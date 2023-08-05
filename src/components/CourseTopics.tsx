"use client";

import React from "react";
import Paragraph from "./ui/Paragraph";
import { ICourseTopic } from "@/types/courseTopic";
import CourseTopic from "./CourseTopic";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setCurrentCourseTopicForCreation } from "@/redux/features/course-creation-slice";
import { setCurrentCourseTopicForView } from "@/redux/features/course-view-slice";
import { useRouter } from "next/navigation";

const CourseTopics = ({ mode }: { mode: "creation" | "edit" | "view" }) => {

  const course = useAppSelector(
    (state) => mode === "view" ? state.courseViewReducer.value.course: state.courseCreationReducer.value.course
  );

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter()

  const redirectToCurrentCourseTopic = (courseTopic: ICourseTopic) => {
    router.push(`/course/${course.slug}?topicId=${courseTopic.topicID}`)
    dispatch(setCurrentCourseTopicForView(courseTopic))
  }

  return (
    <React.Fragment>
      <Paragraph className="mx-2 font-bold">Course Topics</Paragraph>
      {course.topics.map((courseTopic: ICourseTopic, index: number) => {
        return (
          <div
            key={index}
            onClick={() => mode === "view" ? redirectToCurrentCourseTopic(courseTopic) : dispatch(setCurrentCourseTopicForCreation(courseTopic))}
          >
            <CourseTopic
              index={index}
              courseTopic={courseTopic}
              mode={mode}
            />
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default CourseTopics;
