/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Paragraph from "../ui/Paragraph";
import {
  FcApproval,
  FcDeleteRow,
  FcLock,
  FcSettings,
  FcSportsMode,
} from "react-icons/fc";
import TooltipComponent from "../ui/TooltipComponent";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ICourseTopic } from "@/types/courseTopic";
import { getFavicon } from "@/utils/getFavicon";
import { useDispatch } from "react-redux";
import { setCourseForCreation } from "@/redux/features/course-creation-slice";

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
    icon: "w-10 h-10 rounded p-1 hover:bg-slate-300 hover:dark:bg-gray-800",
  };

  const faviconURL = getFavicon(courseTopic.versions[0].url);

  const course = useAppSelector(
    (state) => state.courseCreationReducer.value.course
  );

  const currentCourseTopic = useAppSelector((state) =>
    mode === "view"
      ? state.courseViewReducer.value.currentCourseTopic
      : state.courseCreationReducer.value.currentCourseTopic
  );

  const enrollState = useAppSelector(
    (state) => state.courseViewReducer.value.enrollState
  );
  const dispatch = useDispatch<AppDispatch>();

  const isValidTopic = (): boolean => {
    const currentCourseTopic = courseTopic.topicID as number;
    return enrollState.finishedTopics.includes(currentCourseTopic.toString());
  };

  const removeTopic = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    const topics = course.topics as ICourseTopic[];

    dispatch(
      setCourseForCreation({
        ...course,
        topics: topics.filter(
          (topic: ICourseTopic) => topic.topicID !== courseTopic.topicID
        ),
      })
    );
  };

  return (
    <section
      className={`m-2 border-2 ${
        courseTopic.topicID === currentCourseTopic.topicID
          ? "dark:border-rose-500 border-rose-500"
          : "border-slate-300 dark:border-gray-800"
      } bg-slate-100 dark:bg-gray-950 px-3 md:px-4 py-2 rounded cursor-pointer
      hover:border-rose-500 hover:dark:border-rose-500`}
    >
      <div className="flex items-center justify-between">
        <div>
          <TooltipComponent
            content={
              courseTopic.versions[courseTopic.versions.length - 1].title
            }
          >
            <Paragraph className="truncate-text-1-line text-start">
              {courseTopic.topicID}.{" "}
              <span className="font-bold">
                {courseTopic.versions[courseTopic.versions.length - 1].title}
              </span>{" "}
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
          courseTopic.topicID === currentCourseTopic.topicID ? (
            <TooltipComponent content="Going">
              <FcSportsMode className={styles.icon} />
            </TooltipComponent>
          ) : !isValidTopic() ? (
            <TooltipComponent content="Locked">
              <FcLock className={styles.icon} />
            </TooltipComponent>
          ) : (
            <TooltipComponent content="Done">
              <FcApproval className={styles.icon} />
            </TooltipComponent>
          )
        ) : (
          <TooltipComponent content="Remove">
            <FcDeleteRow
              className={styles.icon}
              onClick={(e) => removeTopic(e)}
            />
          </TooltipComponent>
        )}
      </div>
    </section>
  );
};

export default CourseTopic;
