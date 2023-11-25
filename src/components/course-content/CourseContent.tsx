"use client";

import { ICourseTopic } from "@/types/courseTopic";
import React from "react";
import CourseEmbedLinkDisplay from "../course-embed-link/CourseEmbedLink.Display";

function CourseContent({ courseTopic }: { courseTopic: ICourseTopic }) {
  const topicType = {
    free_source_content: <CourseEmbedLinkDisplay courseTopic={courseTopic} />,
    doc_content: <p>doc</p>,
    quiz: <p>Quiz</p>,
  };
  const version = courseTopic.versions.length - 1;
  return <div>{topicType[courseTopic.versions[version].type]}</div>;
}

export default CourseContent;
