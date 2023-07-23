import React from "react";
import { MdOutlineMenuOpen } from "react-icons/md";
import CourseTopicsSheet from "./CourseTopics.Sheet";
import CourseTopicsSidebar from "./CourseTopics.Sidebar";

const CourseTopics = ({
  showCourseTopics,
  setShowCourseTopics,
  mode,
}: {
  showCourseTopics: boolean;
  setShowCourseTopics: React.Dispatch<React.SetStateAction<boolean>>;
  mode: 'creation' | 'edit' | 'view';
}) => {
  const styles = {
    icon: `w-10 h-10 text-gray-900 dark:text-slate-100 ${
      !showCourseTopics && "rotate-180"
    }`,
  };
  return (
    <React.Fragment>
      <div
        className="hidden md:flex ml-2 lg:ml-6 justify-start fixed cursor-pointer"
        onClick={() => setShowCourseTopics(!showCourseTopics)}
      >
        <MdOutlineMenuOpen className={styles.icon} />
      </div>
      <div className="flex md:hidden ml-2 lg:ml-6 justify-start fixed cursor-pointer">
        <CourseTopicsSheet mode={mode} />
      </div>
      {showCourseTopics && <CourseTopicsSidebar mode={mode} />}
    </React.Fragment>
  );
};

export default CourseTopics;
