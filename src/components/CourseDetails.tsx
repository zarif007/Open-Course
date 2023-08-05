'use cleit'

import React from 'react'
import LargeHeading from './ui/LargeHeading'
import { useAppSelector } from '@/redux/store'
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar'
import Paragraph from './ui/Paragraph'
import SelectedTopics from './SelectedTopics'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { nextApi } from '@/utils/apiEndpoints'

const CourseDetails = () => {
  const course = useAppSelector((state) => state.courseViewReducer.value.course)
  

  const { data, isLoading } = useQuery({
    queryKey: ["creator"],
    queryFn: async () => {
      const { data } = await axios.get(`${nextApi}/getUserInfo?userId=${course.creator}`)
      return data.user;
    },
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log("error", error);
    },
  });


  return (
    <div className="flex flex-col justify-start p-3 md:p-6">
      {/* <img src={`http://localhost:3000/api/generateBanner?courseName=${course.title}&creator=${course.creator.fullName}
      &topics=${course.categories.join('')}&imgUrl=${course.creator.imageUrl}`} alt="ok" className="h-60 rounded" /> */}
      <LargeHeading className="text-start">{course.title}</LargeHeading>
      {
        !isLoading ? <div className="flex space-x-2 items-center">
        <Paragraph className="font-bold text-md">By</Paragraph>
        <Avatar className="h-10 w-10 rounded-full border-2 p-[2px] border-rose-500">
          <AvatarImage className="rounded-full" src={data?.imageUrl} />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        <Paragraph className="font-bold text-md">{data?.firstName}</Paragraph>
      </div> : <div className="flex items-center ">
        <span className="loading loading-infinity loading-lg"></span>
      </div> 
      }

      <div className="flex flex-wrap">
        <div className="m-1">
          <label className="font-semibold">Categories</label>
          <SelectedTopics selectedTopics={course.categories} mode="view" />
        </div>
        <div className="m-1">
          <label className="font-semibold">Levels</label>
          <SelectedTopics selectedTopics={course.levels} mode="view" />
        </div>
        <div className="m-1">
          <label className="font-semibold">languages</label>
          <SelectedTopics selectedTopics={course.languages} mode="view" />
        </div>
      </div>

    </div>
  )
}

export default CourseDetails