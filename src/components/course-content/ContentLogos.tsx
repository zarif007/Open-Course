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
    <div className="flex">
      {topics.slice(0, 6).map((topic, index) => (
        <img
          key={index}
          className={`h-7 w-7 rounded-full border-2 border-rose-500 bg-slate-100 dark:bg-gray-950
                ${index !== 0 && "-ml-2"}`}
          src={getFavicon(topic.versions[topic.versions.length - 1].url)}
          alt="logo"
        />
      ))}
    </div>
  );
};

export default ContentLogos;
