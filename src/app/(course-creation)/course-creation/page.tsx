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
import generateBannerFromCourse from "@/utils/generateBannerFromCourse";
import CourseBannerCreationForm from "@/components/course-banner/CourseBannerCreation.Form";
import CourseCreationSteps from "@/components/course-details/CourseCreationSteps";

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

  const [currentTab, setCurrentTab] = useState<
    "description" | "topic" | "banner"
  >("description");

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

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
      banner:
        course.banner === ""
          ? generateBannerFromCourse(course, signedInUser.name)
          : course.banner,
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
      {currentTab === "description" ? (
        <div className="w-full max-w-4xl mx-auto my-auto pt-8">
          <LargeHeading>Course Details</LargeHeading>
          <CourseDetailsCreation />
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
            <CourseTopicCreation />
          </div>
        </div>
      ) : (
        <CourseBannerCreationForm />
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
              : "Done Creating Course?"}
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

export default CourseCreation;
