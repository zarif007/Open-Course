import React from 'react'
import LargeHeading from './ui/LargeHeading'
import { useAppSelector } from '@/redux/store'

const CourseDetails = () => {
    const course = useAppSelector((state) => state.courseViewReducer.value.course)
  return (
    <LargeHeading>{course.title}</LargeHeading>
  )
}

export default CourseDetails