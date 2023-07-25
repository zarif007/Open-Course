import { ICourseTopic } from "@/types/courseTopic";
import React, { useEffect, useState } from "react";
import LargeHeading from "./ui/LargeHeading";

//YT embed = https://www.youtube.com/embed/videoId
const CourseContent = ({ courseTopic }: { courseTopic: ICourseTopic }) => {
  const [urlStatus, setUrlStatus] = useState<
    "loading" | "available" | "unavailable"
  >("available");
  return (
    <div className="mx-auto mx-4" style={{ width: "100%", height: "100vh" }}>
      <LargeHeading size="sm">{courseTopic.title}</LargeHeading>
      {urlStatus === "loading" ? (
        <p>Loading...</p>
      ) : urlStatus === "available" ? (
        <iframe
          src={courseTopic.url}
          className="rounded"
          width="100%"
          height="100%"
          title="Embedded Website"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <p>{courseTopic.url}</p>
      )}
    </div>
  );
};

export default CourseContent;
