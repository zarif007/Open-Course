"use client";
import React from "react";
import Paragraph from "./ui/Paragraph";
import { FcAddRow, FcApproval, FcLock, FcSettings } from "react-icons/fc";
import TooltipComponent from "./TooltipComponent";
import { ICourseTopic } from "@/types/courseTopic";

const CourseTopic = ({
  index,
  title,
  description,
  mode,
}: {
  index: number;
  title: string;
  description: string;
  mode: "creation" | "edit" | "view";
}) => {
  const styles = {
    icon: "w-8 h-8",
  };

  return (
    <section className="m-2 border-2 border-slate-300 dark:border-gray-800 hover:border-orange-500 hover:dark:border-orange-500  bg-slate-100 dark:bg-gray-950 px-4 md:px-6 py-2 rounded cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <TooltipComponent content={title}>
            <Paragraph className="truncate-text-1-line text-start">
              {`${index}. `} <span className="font-bold">{title}</span>{" "}
            </Paragraph>
          </TooltipComponent>
          <Paragraph size="sm" className="truncate-text-1-line">
            {description}
          </Paragraph>
        </div>
        {mode === "view" ? (
          index > 7 ? (
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
