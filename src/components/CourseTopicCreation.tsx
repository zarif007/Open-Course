import React from "react";
import LargeHeading from "./ui/LargeHeading";

import { ICourseTopic } from "@/types/courseTopic";
import CourseTopicCreationTabs from "./CourseTopicCreation.Tabs";
import shortid from "shortid";
import { toast } from "./ui/Toast";

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
  const submitData = async (data: ICourseTopic) => {
    const filteredCourseTopics = courseTopics.filter(
      (courseTopic) => courseTopic.id !== data.id
    );
    setCourseTopics([...filteredCourseTopics, data]);
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
        currentCourseTopic={currentCourseTopic}
        setCurrentCourseTopic={setCurrentCourseTopic}
        submitData={submitData}
      />
    </section>
  );
};

export default CourseTopicCreation;
