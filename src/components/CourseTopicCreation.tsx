import React from "react";
import LargeHeading from "./ui/LargeHeading";

import { ICourseTopic } from "@/types/courseTopic";
import CourseTopicCreationTabs from "./CourseTopicCreation.Tabs";

const CourseTopicCreation = ({
  currentCourseTopic,
  setCurrentCourseTopic,
  courseTopics,
  setCourseTopics,
}: {
  currentCourseTopic: ICourseTopic;
  setCurrentCourseTopic: React.Dispatch<React.SetStateAction<ICourseTopic>>;
  courseTopics: ICourseTopic[];
  setCourseTopics: React.Dispatch<React.SetStateAction<ICourseTopic[]>>;
}) => {
  const submitData = (data: ICourseTopic) => {
    setCourseTopics([...courseTopics, data]);
  };
  return (
    <section className="mx-2">
      <LargeHeading className="my-4">Course Topic Creation</LargeHeading>

      <CourseTopicCreationTabs
        currentCourseTopic={currentCourseTopic}
        setCurrentCourseTopic={setCurrentCourseTopic}
        submitData={submitData}
      />
    </section>
  );
};

export default CourseTopicCreation;
