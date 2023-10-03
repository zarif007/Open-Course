"use client";

import React, { useState } from "react";
import CourseTopicsBar from "@/components/course-topic/CourseTopics.Bar";
import CourseTopicCreation from "@/components/course-topic/CourseTopicCreation";
import CourseDetailsCreation from "@/components/course-details/CourseDetailsCreation";
import { useAppSelector } from "@/redux/store";
import { Button } from "@/components/ui/Button";
import axios from "axios";
import { toast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";
import { ICourse } from "@/types/course";
import createSlug from "@/utils/createSlug";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { ICourseTopic } from "@/types/courseTopic";
import { useSession } from "next-auth/react";
import { MdCancel, MdFileDownloadDone } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LargeHeading from "@/components/ui/LargeHeading";

const MODE = "creation";

const CourseCreation = () => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);

  const [loadingStatus, setLoadingStatus] = useState<
    "free" | "Processing" | "Redirecting"
  >("free");

  const course = useAppSelector(
    (state) => state.courseCreationReducer.value.course
  );

  const { data: session } = useSession();

  const [currentTab, setCurrentTab] = useState<"des" | "top">("des");

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const router = useRouter();

  const onOutlineButtonClicked = () => {
    if (currentTab === "des") router.push("/");
    else setCurrentTab("des");
  };

  const onGeneralButtonClicked = () => {
    if (currentTab === "des") setCurrentTab("top");
    else handleSubmit();
  };

  const showErrorToast = (errorMsg: string) => {
    toast({
      title: "Complete required fields",
      type: "error",
      message: errorMsg,
    });
  };

  const validateCourseDetails = (): boolean => {
    if (!course.title) {
      showErrorToast("Title is required");
      return false;
    }
    if (course.categories.length === 0) {
      showErrorToast("Must add at least one Category");
      return false;
    }
    if (course.levels.length === 0) {
      showErrorToast("Must add at least one Level");
      return false;
    }
    if (course.languages.length === 0) {
      showErrorToast("Must add at least one Languages");
      return false;
    }
    if (course.topics.length === 1) {
      showErrorToast("Must add at least one Course Topic");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (loadingStatus !== "free" || !session?.user?.email || !signedInUser?.id)
      return;

    if (!validateCourseDetails()) return;

    setLoadingStatus("Processing");

    const courseTopics = course.topics as ICourseTopic[];

    const courseData: ICourse = {
      ...course,
      slug: course.slug ? course.slug : createSlug(course.title),
      topics: courseTopics.filter((topic) => topic.id !== 0),
      creator: signedInUser.id,
    };

    try {
      const { data } = await axios.post(`api/course`, courseData);
      toast({
        title: "Course Created",
        type: "success",
        message: "Course Created Successfully",
      });
      setLoadingStatus("Redirecting");
      router.push(`course-landing/${data.data.slug}`);
    } catch (error) {
      toast({
        title: "Error",
        type: "error",
        message: "Something went wrong, Try again later",
      });
      setLoadingStatus("free");
    }
  };

  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      {currentTab === "des" ? (
        <div className="w-full max-w-5xl mx-auto my-auto pt-8">
          <LargeHeading>Course Details</LargeHeading>
          <CourseDetailsCreation />
        </div>
      ) : (
        <div className="flex pb-24">
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
            <CourseTopicCreation />
          </div>
        </div>
      )}
      <div className="flex justify-center pt-6 space-x-3 items-center w-full">
        <Button
          variant="outline"
          className="flex space-x-2 items-center focus:ring-0"
          onClick={onOutlineButtonClicked}
        >
          {currentTab === "des" ? <MdCancel /> : <IoIosArrowBack />}
          <p className="font-semibold">
            {currentTab === "des" ? "Cancel" : "Previous"}
          </p>
        </Button>
        <Button
          variant="general"
          isLoading={loadingStatus !== "free"}
          className="px-8 flex space-x-2 items-center focus:ring-0"
          onClick={onGeneralButtonClicked}
        >
          <p className="font-semibold">
            {currentTab === "des"
              ? "Next"
              : loadingStatus !== "free"
              ? loadingStatus
              : "Done Creating Course?"}
          </p>
          {currentTab === "des" ? (
            <IoIosArrowForward />
          ) : (
            <MdFileDownloadDone />
          )}
        </Button>
      </div>
    </section>
  );
};

export default CourseCreation;
