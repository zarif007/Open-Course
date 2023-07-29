"use client";

import React from "react";
import Paragraph from "./ui/Paragraph";
import { ICourseTopic } from "@/types/courseTopic";
import CourseTopic from "./CourseTopic";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setCurrentCourseTopic } from "@/redux/features/course-creation-slice";
import { useDispatch } from "react-redux";

const CourseTopics = ({ mode }: { mode: "creation" | "edit" | "view" }) => {
  const courseTopics = useAppSelector(
    (state) => state.courseCreationReducer.value.courseTopics
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <React.Fragment>
      <Paragraph className="mx-2 font-bold">Course Topics</Paragraph>
      {courseTopics.map((courseTopic: ICourseTopic, index: number) => {
        return (
          <div
            key={index}
            onClick={() => dispatch(setCurrentCourseTopic(courseTopic))}
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
