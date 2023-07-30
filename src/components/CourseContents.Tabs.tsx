import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { AiOutlineFolderView } from "react-icons/ai";
import { TbMessageQuestion } from "react-icons/tb";
import CourseContent from './CourseContent';
import { useAppSelector } from '@/redux/store';

const CourseContentsTabs = () => {
    const currentCourseTopic = useAppSelector((state) => state.courseViewReducer.value.currentCourseTopic);
    const course = useAppSelector((state) => state.courseViewReducer.value.course)
  return (
    <Tabs defaultValue="content" className="w-full mx-auto px-6">
      <TabsList className="">
        <TabsTrigger className="font-semibold flex items-center space-x-1" value="content">
          <AiOutlineFolderView className="w-5 h-5" />
          <span>Content</span>
        </TabsTrigger>
        <TabsTrigger className="font-semibold flex items-center space-x-1" value="discuss">
          <TbMessageQuestion className="w-5 h-5" />
          <span>Discuss</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="content">
        <CourseContent courseTopic={currentCourseTopic} />
      </TabsContent>
      <TabsContent value="discuss">
        
      </TabsContent>
    </Tabs>
  )
}

export default CourseContentsTabs