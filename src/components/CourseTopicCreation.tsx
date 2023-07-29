import React from "react";
import LargeHeading from "./ui/LargeHeading";

import { ICourseTopic } from "@/types/courseTopic";
import CourseTopicCreationTabs from "./CourseTopicCreation.Tabs";
import { toast } from "./ui/Toast";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setCourseTopics } from "@/redux/features/course-creation-slice";

const CourseTopicCreation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const courseTopics = useAppSelector((state) => state.courseCreationReducer.value.courseTopics);

  const compare = (a: ICourseTopic, b: ICourseTopic) => {
    if (typeof a.id === "number" && typeof b.id === "number") {
      return a.id - b.id;
    }
    if (!a.id) return 1;
    if (!b.id) return -1;
    if (typeof a.id === "number") return -1;
    return 1;
  }
  const submitData = async (data: ICourseTopic) => {
    const filteredCourseTopics = courseTopics.filter(
      (courseTopic) => courseTopic.id !== data.id
    );
    dispatch(setCourseTopics([...filteredCourseTopics, data].sort(compare)));
    toast({
      title: "Success",
      message: `Topic ${
        filteredCourseTopics.length !== courseTopics.length
          ? "Updated"
          : "Added"
      } Successfully`,
      type: "success",
    });
  };
  return (
    <section className="mx-2">
      <LargeHeading className="my-4">Course Topic Creation</LargeHeading>
      <CourseTopicCreationTabs
        submitData={submitData}
      />
    </section>
  );
};

export default CourseTopicCreation;
