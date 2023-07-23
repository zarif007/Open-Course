import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { ICourseTopic } from "@/types/courseTopic";
import CourseTopicCreationForm from "./CourseTopicCreation.Form";

const CourseCreationTabs = ({ submitData }: {submitData: (data: ICourseTopic) => void;}) => {
  return (
    <Tabs defaultValue="create" className="w-full mx-auto">
      <TabsList>
        <TabsTrigger value="create">Create</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="create">
        <CourseTopicCreationForm submitData={submitData} />
      </TabsContent>
      <TabsContent value="preview">Change your preview here.</TabsContent>
    </Tabs>
  );
};

export default CourseCreationTabs;
