import { ICourse } from '@/types/course';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import React from 'react';
import { redirect } from 'next/navigation';
import CourseGuard from '@/components/course-details/Course.Guard';
import { Metadata } from 'next';
import { IUser } from '@/types/user';
import constructMetadata from '@/utils/constructMetadata';
import generateBannerFromCourse from '@/utils/generateBannerFromCourse';
import { headers } from 'next/headers';
import sortCourseBasedOnTopicsSortID from '@/utils/sortCourseBasedOnTopicsSortID';

interface PageParams {
  params: {
    slug: string;
  };
}

const getCourse = async (slug: string) => {
  const { data: courseData } = await (
    await fetch(`${nextApiEndPoint}/course/bySlug/${slug}`, {
      next: { revalidate: 3600 },
      method: 'GET',
      headers: new Headers(headers()),
    })
  ).json();

  return courseData;
};

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const course: ICourse | null = await getCourse(params.slug);

  if (!course) {
    return constructMetadata();
  }

  const creator = course.creator as IUser;

  const generatedBanner =
    course.banner || generateBannerFromCourse(course, creator.name);

  return constructMetadata({
    title: course?.title,
    description: course?.description,
    image: generatedBanner,
  });
};

const Course = async ({ params }: PageParams) => {
  const course = await getCourse(params.slug);

  if (!course) redirect('/404');

  return <CourseGuard course={sortCourseBasedOnTopicsSortID(course)} />;
};

export default Course;
