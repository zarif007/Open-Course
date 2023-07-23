import React from "react";
import LargeHeading from "./ui/LargeHeading";

import { ICourseTopic } from "@/types/courseTopic";
import CourseTopicCreationForm from "./CourseTopicCreation.Form";
import CourseCreationTabs from "./CourseCreation.Tabs";

const CourseTopicCreation = () => {
  const submitData = (data: ICourseTopic) => {
    console.log(data);
  };
  return (
    <section className="mx-2">
      <LargeHeading>Course Topic Creation</LargeHeading>

      <CourseCreationTabs submitData={submitData} />
    </section>
  );
};

export default CourseTopicCreation;
