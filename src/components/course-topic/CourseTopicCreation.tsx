import React from "react";
import LargeHeading from "../ui/LargeHeading";

import { ICourseTopic } from "@/types/courseTopic";
import CourseTopicCreationTabs from "./CourseTopicCreation.Tabs";
import { toast } from "../ui/Toast";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setCourseForCreation } from "@/redux/features/course-creation-slice";
import { setCourseForUpdate } from "@/redux/features/course-update-slice";

const CourseTopicCreation = ({ mode }: { mode: "creation" | "edit" }) => {
  const dispatch = useDispatch<AppDispatch>();

  const course = useAppSelector((state) =>
    mode === "creation"
      ? state.courseCreationReducer.value.course
      : state.courseUpdateReducer.value.course
  );

  const compare = (a: ICourseTopic, b: ICourseTopic) => {
    if (typeof a.sortID === "number" && typeof b.sortID === "number") {
      return a.sortID - b.sortID;
    }
    if (!a.sortID) return 1;
    if (!b.sortID) return -1;
    if (typeof a.sortID === "number") return -1;
    return 1;
  };

  const submitData = async (data: ICourseTopic) => {
    const courseTopics = course.topics as ICourseTopic[];

    const filteredCourseTopics = courseTopics.filter(
      (courseTopic) => courseTopic.topicID !== data.topicID
    );

    const updated = {
      ...course,
      topics: [...filteredCourseTopics, data].sort(compare),
    };

    dispatch(
      mode === "creation"
        ? setCourseForCreation(updated)
        : setCourseForUpdate(updated)
    );
    toast({
      title: "Success",
      message: `Topic ${
        filteredCourseTopics.length !== course.topics.length
          ? "Updated"
          : "Added"
      } Successfully`,
      type: "success",
    });
  };

  return (
    <section className="mx-2">
      <CourseTopicCreationTabs submitData={submitData} mode={mode} />
    </section>
  );
};

export default CourseTopicCreation;
