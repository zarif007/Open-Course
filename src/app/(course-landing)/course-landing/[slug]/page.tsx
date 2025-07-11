import CourseDetails from '@/components/course-details/CourseDetails';
import CourseEnrollmentButton from '@/components/course-landing-page/Course.EnrollmentButton';
import CourseFeedbacks from '@/components/course-landing-page/CourseFeedbacks';
import CourseLandingSideWidget from '@/components/course-landing-page/CourseLanding.SideWidget';
import CourseTopicsAccordion from '@/components/course-landing-page/CourseTopics.Accordion';
import { Spotlight } from '@/components/ui/animation/Spotlight';
import LargeHeading from '@/components/ui/LargeHeading';
import { ICheckPoint } from '@/types/checkPoint';
import { ICourse } from '@/types/course';
import { ICourseTopic } from '@/types/courseTopic';
import { IEnrollState } from '@/types/enrollState';
import { IUser } from '@/types/user';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import constructMetadata from '@/utils/constructMetadata';
import generateBannerFromCourse from '@/utils/generateBannerFromCourse';
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
        cache: 'force-cache',
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
  const checkPoints = course.checkPoints as ICheckPoint[];

  return (
    <div className="max-w-6xl w-full mx-auto">
      <Spotlight className="left-0 md:left-60 -top-20" fill="white" />
      <div className="border border-slate-300 dark:border-slate-800 py-12 my-2 md:my-4 mx-4 md:mx-6 backdrop-blur-sm">
        <Icon className="absolute h-6 w-6 -top-3 -left-3 text-slate-900 dark:text-slate-100" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-slate-900 dark:text-slate-100" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 text-slate-900 dark:text-slate-100" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-slate-900 dark:text-slate-100" />
        <CourseDetails course={course} />
        <div className="w-full border-b border-slate-300 dark:border-slate-800 my-12" />
        <div className="flex space-x-2 items-center justify-center my-8 z-10">
          <LargeHeading size="sm" className="text-center">
            Course Topics ({course.topics.length})
          </LargeHeading>
          <PiStackDuotone className="w-10 h-10" />
        </div>
        <CourseTopicsAccordion course={course} enrollState={enrollState} />
        <div className="w-full border-b border-slate-300 dark:border-slate-800 my-12" />
        <CourseFeedbacks courseId={course.id as string} />
      </div>
      <CourseLandingSideWidget course={course} />
      <CourseEnrollmentButton course={course} enrollState={enrollState} />
    </div>
  );
};

const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export default CourseLanding;
