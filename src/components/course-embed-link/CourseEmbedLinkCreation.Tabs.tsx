import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { ICourseTopic } from '@/types/courseTopic';
import CourseEmbedLinkCreationForm from './CourseEmbedLinkCreation.Form';
import { MdPreview } from 'react-icons/md';
import { IoIosCreate } from 'react-icons/io';
import { useAppSelector } from '@/redux/store';
import CourseContent from '../course-content/CourseContent';

const CourseEmbedLinkCreationTabs = ({
  submitData,
  mode,
}: {
  submitData: (data: ICourseTopic) => void;
  mode: 'creation' | 'edit' | 'contribution';
}) => {
  const currentCourseTopic = useAppSelector((state) =>
    mode === 'creation'
      ? state.courseCreationReducer.value.currentCourseTopic
      : state.courseUpdateReducer.value.currentCourseTopic
  );
  const version = currentCourseTopic.versions.length - 1;
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
        <CourseEmbedLinkCreationForm submitData={submitData} mode={mode} />
      </TabsContent>
      <TabsContent value="preview">
        <CourseContent content={currentCourseTopic.versions[version].data} />
      </TabsContent>
    </Tabs>
  );
};

export default CourseEmbedLinkCreationTabs;
