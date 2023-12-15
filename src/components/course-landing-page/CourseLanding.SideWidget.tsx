import React from 'react';
import { FcBookmark, FcSettings } from 'react-icons/fc';
import TooltipComponent from '../ui/TooltipComponent';
import { ICourse } from '@/types/course';
import { IUser } from '@/types/user';
import CourseShareDialog from './CourseShare.Dialog';
import { mainEndPoint } from '@/utils/apiEndpoints';
import CourseInvitationDialog from './CourseInvitation.Dialog';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { AiTwotoneDelete } from 'react-icons/ai';
import CourseDeleteDialog from './CourseDelete.Dialog';

const CourseLandingSideWidget = async ({ course }: { course: ICourse }) => {
  const session = await getServerSession(authOptions);
  const creator = course.creator as IUser;

  const styles = {
    icon: 'w-8 h-8 cursor-pointer',
  };

  return (
    <div className="fixed right-0 flex items-center bottom-1 h-full mx-1">
      <div className="rounded bg-slate-200 dark:bg-gray-900 border border-slate-300 dark:border-gray-800 py-4 px-2 flex flex-col space-y-4">
        <CourseShareDialog
          url={`${mainEndPoint}/course-landing/${course.slug}`}
        />
        <CourseInvitationDialog
          courseSlug={course.slug}
          banner={course.banner}
          courseId={course.id as string}
          courseTitle={course.title}
        />
        <TooltipComponent content="Bookmark this course">
          <FcBookmark className={styles.icon} />
        </TooltipComponent>
        {creator.email === session?.user?.email && (
          <div className="flex flex-col space-y-4">
            <TooltipComponent content="Settings">
              <Link href={`/course-update/${course.slug}`}>
                <FcSettings className={styles.icon} />
              </Link>
            </TooltipComponent>
            <TooltipComponent content="Delete">
              <CourseDeleteDialog courseId={course.id as string} />
            </TooltipComponent>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseLandingSideWidget;
