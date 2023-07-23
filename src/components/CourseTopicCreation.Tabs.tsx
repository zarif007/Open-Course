import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { ICourseTopic } from "@/types/courseTopic";
import CourseTopicCreationForm from "./CourseTopicCreation.Form";
import CourseContent from "./CourseContent";

const CourseTopicCreationTabs = ({
  currentCourseTopic,
  setCurrentCourseTopic,
  submitData,
}: {
  currentCourseTopic: ICourseTopic;
  setCurrentCourseTopic: React.Dispatch<React.SetStateAction<ICourseTopic>>;
  submitData: (data: ICourseTopic) => void;
}) => {
  return (
    <Tabs defaultValue="create" className="w-full mx-auto px-4">
      <TabsList>
        <TabsTrigger value="create">Create</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="create">
        <CourseTopicCreationForm
          submitData={submitData}
          courseTopic={currentCourseTopic}
          setCourseTopic={setCurrentCourseTopic}
        />
      </TabsContent>
      <TabsContent value="preview">
        <CourseContent courseTopic={currentCourseTopic} />
      </TabsContent>
    </Tabs>
  );
};

export default CourseTopicCreationTabs;
