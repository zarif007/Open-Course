import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { ICourseTopic } from "@/types/courseTopic";
import CourseTopicCreationForm from "./CourseTopicCreation.Form";
import CourseContent from "./CourseContent";
import { MdPreview } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { useAppSelector } from "@/redux/store";

const CourseTopicCreationTabs = ({
  submitData,
}: {
  submitData: (data: ICourseTopic) => void;
}) => {
  const currentCourseTopic = useAppSelector((state) => state.courseCreationReducer.value.currentCourseTopic);
  return (
    <Tabs defaultValue="create" className="w-full mx-auto px-2 md:px-4">
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
        />
      </TabsContent>
      <TabsContent value="preview">
        <CourseContent courseTopic={currentCourseTopic} />
      </TabsContent>
    </Tabs>
  );
};

export default CourseTopicCreationTabs;
