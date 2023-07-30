"use client";

import React from "react";
import Paragraph from "./ui/Paragraph";
import { ICourseTopic } from "@/types/courseTopic";
import CourseTopic from "./CourseTopic";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setCurrentCourseTopicForCreation } from "@/redux/features/course-creation-slice";
import { setCurrentCourseTopicForView } from "@/redux/features/course-view-slice";

const CourseTopics = ({ mode }: { mode: "creation" | "edit" | "view" }) => {
  const course = useAppSelector(
    (state) => mode === "view" ? state.courseViewReducer.value.course: state.courseCreationReducer.value.course
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <React.Fragment>
      <Paragraph className="mx-2 font-bold">Course Topics</Paragraph>
      {course.topics.map((courseTopic: ICourseTopic, index: number) => {
        return (
          <div
            key={index}
            onClick={() => dispatch(mode === 'view' ? setCurrentCourseTopicForView(courseTopic) : setCurrentCourseTopicForCreation(courseTopic))}
          >
            <CourseTopic
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
