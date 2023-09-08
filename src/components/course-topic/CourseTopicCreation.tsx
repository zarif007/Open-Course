import React from "react";
import LargeHeading from "../ui/LargeHeading";

import { ICourseTopic } from "@/types/courseTopic";
import CourseTopicCreationTabs from "./CourseTopicCreation.Tabs";
import { toast } from "../ui/Toast";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setCourseForCreation } from "@/redux/features/course-creation-slice";

const CourseTopicCreation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const course = useAppSelector(
    (state) => state.courseCreationReducer.value.course
  );

  const compare = (a: ICourseTopic, b: ICourseTopic) => {
    if (typeof a.topicID === "number" && typeof b.topicID === "number") {
      return a.topicID - b.topicID;
    }
    if (!a.topicID) return 1;
    if (!b.topicID) return -1;
    if (typeof a.topicID === "number") return -1;
    return 1;
  };

  const submitData = async (data: ICourseTopic) => {
    const courseTopics = course.topics as ICourseTopic[];
    const filteredCourseTopics = courseTopics.filter(
      (courseTopic) => courseTopic.topicID !== data.topicID
    );
    dispatch(
      setCourseForCreation({
        ...course,
        topics: [...filteredCourseTopics, data].sort(compare),
      })
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
      <LargeHeading className="my-4">Course Topic Creation</LargeHeading>
      <CourseTopicCreationTabs submitData={submitData} />
    </section>
  );
};

export default CourseTopicCreation;
