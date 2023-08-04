"use client";

import React from "react";
import Paragraph from "./ui/Paragraph";
import { FcApproval, FcLock, FcSettings, FcSportsMode } from "react-icons/fc";
import TooltipComponent from "./TooltipComponent";
import { useAppSelector } from "@/redux/store";
import { ICourseTopic } from '@/types/courseTopic';
import { getFavicon } from "@/utils/getFavicon";

const CourseTopic = ({
  index,
  courseTopic,
  mode,
}: {
  index: number;
  courseTopic: ICourseTopic;
  mode: "creation" | "edit" | "view";
}) => {
  const styles = {
    icon: "w-8 h-8",
  };

  const faviconURL = getFavicon(courseTopic.versions[0].url);

  const currentCourseTopic = useAppSelector(
    (state) => mode === 'view' ? state.courseViewReducer.value.currentCourseTopic
    : state.courseCreationReducer.value.currentCourseTopic
  );

  return (
    <section
      className={`m-2 border-2 ${
        courseTopic.topicID === currentCourseTopic.topicID
          ? "dark:border-rose-500 border-rose-500"
          : "border-slate-300 dark:border-gray-800"
      } bg-slate-100 dark:bg-gray-950 px-4 md:px-6 py-2 rounded cursor-pointer
      hover:border-rose-500 hover:dark:border-rose-500`}
    >
      <div className="flex items-center justify-between">
        <div>
          <TooltipComponent content={courseTopic.versions[courseTopic.versions.length - 1].title}>
            <Paragraph className="truncate-text-1-line text-start">
              {courseTopic.topicID}. <span className="font-bold">{courseTopic.versions[courseTopic.versions.length - 1].title}</span>{" "}
            </Paragraph>
          </TooltipComponent>
          <div className="flex space-x-2 items-center">
            <img src={faviconURL} className="h-7 w-7" alt="og" />
            <Paragraph size="sm" className="truncate-text-1-line font-semibold">
              {courseTopic.versions[courseTopic.versions.length - 1].duration}m
            </Paragraph>
          </div>
        </div>
        {mode === "view" ? (
          courseTopic.topicID === currentCourseTopic.topicID ? <FcSportsMode className={styles.icon}  /> : 
          (courseTopic.topicID && courseTopic.topicID > 7) ? (
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
