import CourseRatingTaker from '@/components/CourseRatingTaker';
import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';
import { v1MainEndpoint } from '@/utils/apiEndpoints';
import { currentUser } from '@clerk/nextjs';
import axios from 'axios';
import { redirect } from 'next/navigation';
import React from 'react'

interface PageParams {
    params: {
      slug: string;
    };
  }

const CourseCompletion = async ({ params }: PageParams) => {
  const slug = params.slug

  const { data: CourseData } = await axios.get(`${v1MainEndpoint}/course/bySlug/${slug}`)
  const course = CourseData.data;
  if(!course) redirect('/404')

  const user = await currentUser()
  if(!user) redirect('')

  const { data: EnrollStateData } = await axios.get(`${v1MainEndpoint}/enrollState/?user=${user?.id}&course=${course.id}`)
  const enrollState = EnrollStateData.data
  if(!enrollState) redirect(`/course/${slug}`)

  return (
    <main className="w-full max-w-5xl mx-auto h-full flex flex-col">
      <LargeHeading>Congratulation 🎉</LargeHeading>
      <LargeHeading size="sm">on the Completion of</LargeHeading>
      <LargeHeading className="underline decoration-rose-500 decoration-4">{course.title}</LargeHeading>

      <CourseRatingTaker />
    </main>
  )
}

export default CourseCompletion