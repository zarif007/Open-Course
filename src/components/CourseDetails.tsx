import React from 'react'
import LargeHeading from './ui/LargeHeading'
import { useAppSelector } from '@/redux/store'
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar'
import Paragraph from './ui/Paragraph'
import SelectedTopics from './SelectedTopics'

const CourseDetails = () => {
  const course = useAppSelector((state) => state.courseViewReducer.value.course)
  return (
    <div className="flex flex-col justify-start p-3 md:p-6">
      {/* <img src={`http://localhost:3000/api/generateBanner?courseName=${course.title}&creator=${course.creator.fullName}
      &topics=${course.categories.join('')}&imgUrl=${course.creator.imageUrl}`} alt="ok" className="h-60 rounded" /> */}
      <LargeHeading className="text-start">{course.title}</LargeHeading>
      <div className="flex space-x-2 items-center">
        <Paragraph className="font-bold text-md">By</Paragraph>
        <Avatar className="h-10 w-10 rounded-full border-2 p-[2px] border-rose-500">
          <AvatarImage className="rounded-full" src={course.creator.imageUrl} />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        <Paragraph className="font-bold text-md">{course.creator.fullName}</Paragraph>
      </div>

      <div className="flex space-x-3 flex-wrap">
        <div className="my-1">
          <label className="font-semibold">Categoris</label>
          <SelectedTopics selectedTopics={course.categories} mode="view" />
        </div>
        <div className="my-1">
          <label className="font-semibold">Levels</label>
          <SelectedTopics selectedTopics={course.levels} mode="view" />
        </div>
        <div className="my-1">
          <label className="font-semibold">languages</label>
          <SelectedTopics selectedTopics={course.languages} mode="view" />
        </div>
      </div>

    </div>
  )
}

export default CourseDetails