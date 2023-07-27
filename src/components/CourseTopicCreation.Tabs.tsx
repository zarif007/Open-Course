import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { ICourseTopic } from "@/types/courseTopic";
import CourseTopicCreationForm from "./CourseTopicCreation.Form";
import CourseContent from "./CourseContent";
import { MdPreview } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";

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
      <TabsList className="">
        <TabsTrigger className="font-semibold" value="create">
          <IoIosCreate />
          Create
        </TabsTrigger>
        <TabsTrigger className="font-semibold" value="preview">
          <MdPreview />
          Preview
        </TabsTrigger>
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
