"use client";
import React from "react";
import Paragraph from "./ui/Paragraph";
import { FcApproval, FcLock } from "react-icons/fc";
import TooltipComponent from "./TooltipComponent";

const CourseTopic = ({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) => {
  const styles = {
    icon: "w-8 h-8",
  };
  return (
    <section className="m-2 border-2 border-slate-300 dark:border-gray-800 hover:border-blue-700 hover:dark:border-blue-700  bg-slate-100 dark:bg-gray-950 px-4 md:px-6 py-2 rounded cursor-pointer">
      <div className="flex items-center">
        <div>
          <Paragraph className="truncate-text-1-line">
            {`${index}. `} <span className="font-bold">{title}</span>{" "}
          </Paragraph>
          <Paragraph size="sm" className="truncate-text-1-line">
            {description}
          </Paragraph>
        </div>
        {index > 7 ? (
          <TooltipComponent content="Locked">
            <FcLock className={styles.icon} />
          </TooltipComponent>
        ) : (
          <TooltipComponent content="Done">
            <FcApproval className={styles.icon} />
          </TooltipComponent>
        )}
      </div>
    </section>
  );
};

export default CourseTopic;
