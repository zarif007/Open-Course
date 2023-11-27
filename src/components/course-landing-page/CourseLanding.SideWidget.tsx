import React from "react";
import { FcBookmark, FcInvite, FcSettings, FcShare } from "react-icons/fc";
import TooltipComponent from "../ui/TooltipComponent";
import { ICourse } from "@/types/course";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/user";

const styles = {
  icon: "w-8 h-8 cursor-pointer",
};

const items = [
  {
    icon: <FcShare className={styles.icon} />,
    text: "Share with people",
  },
  {
    icon: <FcInvite className={styles.icon} />,
    text: "Invite friends",
  },
  {
    icon: <FcBookmark className={styles.icon} />,
    text: "Bookmark this course",
  },
  {
    icon: <FcSettings className={styles.icon} />,
    text: "Settings",
  },
];
const CourseLandingSideWidget = ({ course }: { course: ICourse }) => {
  const { data: session } = useSession();
  const creator = course.creator as IUser;

  const router = useRouter();

  const handleSettings = () => {
    router.push(`/course-update/${course.slug}`);
  };

  const handleOnClick = (text: string) => {
    if (text === "Settings") handleSettings();
  };

  return (
    <div className="fixed right-0 flex items-center bottom-1 h-full mx-1">
      <div className="rounded bg-slate-200 dark:bg-gray-900 border border-slate-300 dark:border-gray-800 py-4 px-2 flex flex-col space-y-4">
        {items.map((item) => {
          const show =
            item.text !== "Settings" || creator.email === session?.user?.email;
          return (
            <div key={item.text}>
              {show && (
                <TooltipComponent content={item.text}>
                  <div onClick={() => handleOnClick(item.text)}>
                    {item.icon}
                  </div>
                </TooltipComponent>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseLandingSideWidget;
