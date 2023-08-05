'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { AiOutlineFolderView } from "react-icons/ai";
import { TbMessageQuestion } from "react-icons/tb";
import CourseContent from './CourseContent';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import { useDispatch } from 'react-redux';
import { setCurrentCourseTopicForView } from '@/redux/features/course-view-slice';

const CourseContentsTabs = () => {
  
  const currentCourseTopic = useAppSelector((state) => state.courseViewReducer.value.currentCourseTopic);

  const course = useAppSelector((state) => state.courseViewReducer.value.course)

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const handleNextButton = () => {
    // update in enroll state db
    router.push(`/course/${course.slug}?topicId=${currentCourseTopic.topicID ? currentCourseTopic.topicID + 1 : 1}`)

    dispatch(setCurrentCourseTopicForView(course.topics[currentCourseTopic.topicID ? currentCourseTopic.topicID : 0]))
  }

  const handleDoneButton = () => {
    
  }

  return (
    <Tabs defaultValue="content" className="w-full mx-auto px-2 md:px-6">
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
        <div className="mt-20 flex justify-end">
          {
            currentCourseTopic.topicID && currentCourseTopic.topicID < course.topics.length ? (
              <Button className="px-12" onClick={handleNextButton}>Next</Button>
            ) : (
              <Button className="px-12" onClick={handleDoneButton}>Done</Button>
            )
          }
        </div>
      </TabsContent>
      <TabsContent value="discuss">
        
      </TabsContent>
    </Tabs>
  )
}

export default CourseContentsTabs