"use client";

import React from "react";
import Paragraph from "./ui/Paragraph";
import { FcApproval, FcLock, FcSettings } from "react-icons/fc";
import TooltipComponent from "./TooltipComponent";
import { useAppSelector } from "@/redux/store";
import { ICourseTopic } from '@/types/courseTopic';

const CourseTopic = ({
  courseTopic,
  mode,
}: {
  courseTopic: ICourseTopic;
  mode: "creation" | "edit" | "view";
}) => {
  const styles = {
    icon: "w-8 h-8",
  };

  const currentCourseTopic = useAppSelector(
    (state) => mode === 'view' ? state.courseViewReducer.value.currentCourseTopic
    : state.courseCreationReducer.value.currentCourseTopic
  );

  return (
    <section
      className={`m-2 border-2 ${
        courseTopic.id === currentCourseTopic.id
          ? "dark:border-orange-500 border-orange-500"
          : "border-slate-300 dark:border-gray-800"
      } bg-slate-100 dark:bg-gray-950 px-4 md:px-6 py-2 rounded cursor-pointer
      hover:border-orange-500 hover:dark:border-orange-500`}
    >
      <div className="flex items-center justify-between">
        <div>
          <TooltipComponent content={courseTopic.title}>
            <Paragraph className="truncate-text-1-line text-start">
              <span className="font-bold">{courseTopic.title}</span>{" "}
            </Paragraph>
          </TooltipComponent>
          <Paragraph size="sm" className="truncate-text-1-line">
            {/* {courseTopic.description} */}
            Another description
          </Paragraph>
        </div>
        {mode === "view" ? (
          (courseTopic.id && courseTopic.id > 7) ? (
            <TooltipComponent content="Locked">
              <FcLock className={styles.icon} />
            </TooltipComponent>
          ) : (
            <TooltipComponent content="Done">
              <FcApproval className={styles.icon} />
            </TooltipComponent>
          )
        ) : (
          <TooltipComponent content="Settings">
            <FcSettings className={styles.icon} />
          </TooltipComponent>
        )}
      </div>
    </section>
  );
};

export default CourseTopic;
