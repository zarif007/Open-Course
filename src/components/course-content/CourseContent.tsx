"use client";

import { ICourseTopic } from "@/types/courseTopic";
import React, { useEffect, useState } from "react";
import LargeHeading from "../ui/LargeHeading";
import createEmbeddableUrls from "@/utils/getEmbedableUrl";
import CourseContentFullscreenDialog from "./CourseContentFullscreen.Dialog";
import CourseContentUrl from "./CourseContentUrl";
import { FiLink } from "react-icons/fi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import checkIfUrlIsEmbeddable from "@/utils/checkIfUrlIsEmbeddable";

function CourseContent({ courseTopic }: { courseTopic: ICourseTopic }) {
  const [showUrl, setShowUrl] = useState<boolean>(false);

  const contentUrl =
    courseTopic.versions[courseTopic.versions.length - 1].data.url;

  return (
    <div className={`mx-auto w-[100%] h-[45vh] md:h-[80vh]`} id="main">
      <div className="flex items-center justify-end space-x-8">
        <div onClick={() => setShowUrl(!showUrl)}>
          {!showUrl ? (
            <div className="flex space-x-1 items-center cursor-pointer">
              <FiLink />
              <p>Link</p>
            </div>
          ) : (
            <div className="flex space-x-1 items-center cursor-pointer">
              <MdOutlineVideoLibrary />
              <p>Content</p>
            </div>
          )}
        </div>
        <CourseContentFullscreenDialog url={contentUrl} />
      </div>
      {!showUrl ? (
        <iframe
          src={createEmbeddableUrls(contentUrl)}
          id="iframe"
          className="border-[3px] border-rose-500 rounded "
          width="100%"
          height="100%"
          title="Embedded Website"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <CourseContentUrl url={contentUrl} />
      )}
    </div>
  );
}

export default CourseContent;
