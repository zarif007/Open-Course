"use client";
import { ICourseTopic } from "@/types/courseTopic";
import React, { useEffect, useState } from "react";
import LargeHeading from "./ui/LargeHeading";
import createEmbeddableUrls from "@/utils/getEmbedableUrl";

function CourseContent({ courseTopic }: { courseTopic: ICourseTopic }) {
  const [urlStatus, setUrlStatus] = useState<
    "loading" | "available" | "unavailable"
  >("available");

  return (
    <div className="mx-auto w-[100%] h-[45vh] md:h-[70vh]">
      <LargeHeading
        size="sm"
        onClick={() =>
          console.log(
            createEmbeddableUrls(
              courseTopic.versions[courseTopic.versions.length - 1].url
            )
          )
        }
      >
        {courseTopic.versions[courseTopic.versions.length - 1].title}
      </LargeHeading>
      {urlStatus === "loading" ? (
        <p>Loading...</p>
      ) : urlStatus === "available" ? (
        <iframe
          src={createEmbeddableUrls(
            courseTopic.versions[courseTopic.versions.length - 1].url
          )}
          className="border-[3px] border-rose-500 rounded "
          width="100%"
          height="100%"
          title="Embedded Website"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <p>{courseTopic.versions[courseTopic.versions.length - 1].url}</p>
      )}
    </div>
  );
}

export default CourseContent;
