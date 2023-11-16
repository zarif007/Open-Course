/* eslint-disable @next/next/no-img-element */
import { ICourseTopic } from "@/types/courseTopic";
import { getFavicon } from "@/utils/getFavicon";
import React from "react";

const ContentLogos = ({
  topics,
  withDuration,
}: {
  topics: ICourseTopic[];
  withDuration: boolean;
}) => {
  return (
    <div className="flex items-center justify-center">
      {topics.slice(0, 6).map((topic, index) => (
        <img
          key={index}
          className={`h-7 w-7 rounded-full border-2 border-rose-500 bg-slate-100 dark:bg-gray-950
                ${index !== 0 && "-ml-2"}`}
          src={getFavicon(
            topic.versions[topic.versions.length - 1].source ?? ""
          )}
          alt="logo"
        />
      ))}
    </div>
  );
};

export default ContentLogos;
