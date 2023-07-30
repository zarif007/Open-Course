import React from 'react'
import LargeHeading from './ui/LargeHeading'
import { useAppSelector } from '@/redux/store'
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar'
import Paragraph from './ui/Paragraph'
import SelectedCourseTypes from './SelectedCourseTypes'

const CourseDetails = () => {
  const course = useAppSelector((state) => state.courseViewReducer.value.course)
  return (
    <div className="flex flex-col justify-start p-3 md:p-6">
      <LargeHeading className="text-start">{course.title}</LargeHeading>
      <div className="flex space-x-2 items-center">
        <Paragraph className="font-bold text-md">By</Paragraph>
        <Avatar className="h-8 w-8 rounded-full border-2 p-[2px] border-orange-500">
          <AvatarImage src={course.creator.imageUrl} />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        <Paragraph className="font-bold text-md">{course.creator.fullName}</Paragraph>
      </div>
      <SelectedCourseTypes selectedCourseTypes={course.categories} />
    </div>
  )
}

export default CourseDetails