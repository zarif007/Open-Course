import React from "react";
import { FcBookmark, FcSettings } from "react-icons/fc";
import TooltipComponent from "../ui/TooltipComponent";
import { ICourse } from "@/types/course";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/user";
import CourseShareDialog from "./CourseShare.Dialog";
import { mainEndPoint } from "@/utils/apiEndpoints";
import CourseInvitationDialog from "./CourseInvitation.Dialog";

const CourseLandingSideWidget = ({ course }: { course: ICourse }) => {
  const { data: session } = useSession();
  const creator = course.creator as IUser;

  const router = useRouter();

  const styles = {
    icon: "w-8 h-8 cursor-pointer",
  };

  const handleSettings = () => {
    router.push(`/course-update/${course.slug}`);
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
          <TooltipComponent content="Settings">
            <div onClick={handleSettings}>
              <FcSettings className={styles.icon} />
            </div>
          </TooltipComponent>
        )}
      </div>
    </div>
  );
};

export default CourseLandingSideWidget;
