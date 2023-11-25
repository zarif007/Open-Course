import React from "react";
import LargeHeading from "../ui/LargeHeading";

import { ICourseTopic } from "@/types/courseTopic";
import CourseEmbedLinkCreationTabs from "../course-embed-link/CourseEmbedLinkCreation.Tabs";
import { toast } from "../ui/Toast";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setCourseForCreation } from "@/redux/features/course-creation-slice";
import { setCourseForUpdate } from "@/redux/features/course-update-slice";
import DocCreationForm from "../course-doc/DocCreation.Form";
import CourseEmbedLinkCreationForm from "../course-embed-link/CourseEmbedLinkCreation.Form";
import CourseTopicSelector from "./CourseTopic.Selector";
import { setSelectedTopicType } from "@/redux/features/selected-topic-type";
import { FaArrowLeft } from "react-icons/fa6";

const CourseTopicCreation = ({
  mode,
  selectedTopicType,
}: {
  mode: "creation" | "edit";
  selectedTopicType: "free_source_content" | "doc_content" | "quiz" | "";
}) => {
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

  const currentSelectedType = {
    "": <CourseTopicSelector />,
    free_source_content: (
      <CourseEmbedLinkCreationTabs submitData={submitData} mode={mode} />
    ),
    doc_content: <DocCreationForm submitData={submitData} mode={mode} />,
    quiz: <p>Quiz</p>,
  };

  return (
    <section className="mx-2 animate-in slide-in-from-right duration-300">
      <LargeHeading className="mt-4 mb-12">Course Topic Creation</LargeHeading>

      {selectedTopicType !== "" && (
        <div
          className="flex justify-end m-4 md:m-8 cursor-pointer"
          onClick={() => dispatch(setSelectedTopicType(""))}
        >
          <FaArrowLeft className="h-10 w-10" />
        </div>
      )}

      {currentSelectedType[selectedTopicType]}
    </section>
  );
};

export default CourseTopicCreation;
