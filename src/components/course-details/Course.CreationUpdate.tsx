"use client";

import React, { useState } from "react";
import CourseTopicsBar from "@/components/course-topic/CourseTopics.Bar";
import CourseTopicCreation from "@/components/course-topic/CourseTopicCreation";
import CourseDetailsCreation from "@/components/course-details/CourseDetailsCreation";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { MdCancel, MdFileDownloadDone } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LargeHeading from "@/components/ui/LargeHeading";
import CourseBannerCreationForm from "@/components/course-banner/CourseBannerCreation.Form";
import CourseCreationSteps from "@/components/course-details/CourseCreationSteps";

const CourseCreationUpdate = ({
  MODE,
  loadingStatus,
  handleSubmit,
}: {
  MODE: "creation" | "edit";
  loadingStatus: "free" | "Processing" | "Redirecting";
  handleSubmit: () => Promise<void>;
}) => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);

  const [currentTab, setCurrentTab] = useState<
    "description" | "topic" | "banner"
  >("description");

  const router = useRouter();

  const onOutlineButtonClicked = () => {
    if (currentTab === "description") router.push("/");
    else setCurrentTab(currentTab === "banner" ? "topic" : "description");
  };

  const onGeneralButtonClicked = () => {
    if (currentTab !== "banner")
      setCurrentTab(currentTab === "description" ? "topic" : "banner");
    else handleSubmit();
  };

  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      {currentTab === "description" ? (
        <div className="w-full max-w-4xl mx-auto my-auto pt-8">
          <LargeHeading>Course Details</LargeHeading>
          <CourseDetailsCreation mode={MODE} />
        </div>
      ) : currentTab === "topic" ? (
        <div className="flex pb-20">
          {/* Left */}
          <CourseTopicsBar
            showCourseTopics={showCourseTopics}
            setShowCourseTopics={setShowCourseTopics}
            mode={MODE}
          />

          {/* Right */}
          <div
            className={`${
              showCourseTopics ? "w-full md:w-9/12" : "w-full"
            }  ml-auto rounded mt-6`}
          >
            <CourseTopicCreation mode={MODE} />
          </div>
        </div>
      ) : (
        <CourseBannerCreationForm mode={MODE} />
      )}

      <CourseCreationSteps
        step={currentTab === "description" ? 0 : currentTab === "topic" ? 1 : 2}
      />

      <div className="flex justify-center pt-6 space-x-3 items-center w-full">
        <Button
          variant="outline"
          className="flex space-x-2 items-center focus:ring-0"
          onClick={onOutlineButtonClicked}
        >
          {currentTab === "description" ? <MdCancel /> : <IoIosArrowBack />}
          <p className="font-semibold">
            {currentTab === "description" ? "Cancel" : "Previous"}
          </p>
        </Button>
        <Button
          variant="general"
          isLoading={loadingStatus !== "free"}
          className="px-8 flex space-x-2 items-center focus:ring-0"
          onClick={onGeneralButtonClicked}
        >
          <p className="font-semibold">
            {currentTab !== "banner"
              ? "Next"
              : loadingStatus !== "free"
              ? loadingStatus
              : `Done ${MODE === "creation" ? "Creating" : "Updating"} Course?`}
          </p>
          {currentTab !== "banner" ? (
            <IoIosArrowForward />
          ) : (
            <MdFileDownloadDone />
          )}
        </Button>
      </div>
    </section>
  );
};

export default CourseCreationUpdate;
