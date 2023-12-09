import CourseDetails from '@/components/course-details/CourseDetails';
import CourseEnrollmentButton from '@/components/course-landing-page/Course.EnrollmentButton';
import CourseLandingSideWidget from '@/components/course-landing-page/CourseLanding.SideWidget';
import CourseRatings from '@/components/course-landing-page/CourseRatings';
import CourseReviews from '@/components/course-landing-page/CourseReviews';
import CourseTopicsAccordion from '@/components/course-landing-page/CourseTopics.Accordion';
import LargeHeading from '@/components/ui/LargeHeading';
import { ICourse } from '@/types/course';
import { ICourseTopic } from '@/types/courseTopic';
import { IEnrollState } from '@/types/enrollState';
import { IUser } from '@/types/user';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import constructMetadata from '@/utils/constructMetadata';
import generateBannerFromCourse from '@/utils/generateBannerFromCourse';
import sortCourseBasedOnTopicsSortID from '@/utils/sortCourseBasedOnTopicsSortID';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { PiStackDuotone } from 'react-icons/pi';

interface PageParams {
  params: {
    slug: string;
  };
}

const getCourseAndEnrollState = async (
  slug: string,
  userEmail: string | null
): Promise<{ course: ICourse | null; enrollState: IEnrollState | null }> => {
  const data = await (
    await fetch(
      `${nextApiEndPoint}/course/withEnrollState?courseSlug=${slug}&userEmail=${userEmail}`,
      {
        next: { revalidate: 3600 },
        method: 'GET',
        headers: new Headers(headers()),
      }
    )
  ).json();

  return data;
};

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const { course } = await getCourseAndEnrollState(params.slug, null);

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

const CourseLanding = async ({ params }: PageParams) => {
  const session = await getServerSession();

  const { course, enrollState } = await getCourseAndEnrollState(
    params.slug,
    session?.user?.email ?? null
  );

  if (!course) redirect('/404');

  // const sortedCourse = sortCourseBasedOnTopicsSortID(course);

  const courseTopics = course.topics as ICourseTopic[];

  return (
    <div className="max-w-5xl w-full mx-auto">
      <CourseLandingSideWidget course={course} />
      <CourseDetails course={course} />
      <CourseRatings reviews={course.reviews ?? []} />
      <div className="flex space-x-2 items-center justify-center mt-8">
        <LargeHeading size="sm" className="text-center">
          Course Topics ({course.topics.length})
        </LargeHeading>
        <PiStackDuotone className="w-10 h-10" />
      </div>
      <CourseTopicsAccordion courseTopics={courseTopics} />
      <CourseReviews reviews={course.reviews ?? []} />
      <CourseEnrollmentButton course={course} enrollState={enrollState} />
    </div>
  );
};

export default CourseLanding;
