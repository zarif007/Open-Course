/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { getFavicon } from "@/utils/getFavicon";
import Paragraph from "../ui/Paragraph";
import LargeHeading from "../ui/LargeHeading";
import CourseDetails from "./CourseDetails";
import { Button } from "../ui/Button";
import axios from "axios";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { toast } from "../ui/Toast";
import { useRouter } from "next/navigation";
import CourseRatings from "./CourseRatings";
import { ICourse } from "@/types/course";
import { ICourseTopic } from "@/types/courseTopic";
import { IEnrollState } from "@/types/enrollState";
import { signIn, useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/store";

const CourseLandingPage = ({
  course,
  enrollState,
}: {
  course: ICourse;
  enrollState: IEnrollState | null;
}) => {
  const router = useRouter();

  const [loadingStatus, setLoadingStatus] = useState<
    "free" | "Processing" | "Redirecting"
  >("free");

  const [isEnrolled, setIsEnrolled] = useState<string>("loading");

  const { data: session } = useSession();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  useEffect(() => {
    if (!signedInUser?.id || !enrollState) {
      setIsEnrolled("no");
    } else {
      setIsEnrolled("yes");
    }
  }, [course, signedInUser?.id, enrollState]);

  const handleEnrollment = async () => {
    if (loadingStatus !== "free" || !signedInUser?.id) return;

    setLoadingStatus("Processing");

    try {
      const data = {
        course: course.id,
        user: signedInUser?.id,
      };

      await axios.post(`${nextApiEndPoint}/enrollState`, data);

      // window.location.reload();
      router.push(`/course/${course.slug}?topicId=1`);
      setLoadingStatus("Redirecting");
      toast({
        title: "Course Enrolled",
        type: "success",
        message: `${course.title} Enrolled Successfully`,
      });
    } catch (error) {
      toast({
        title: "error",
        type: "error",
        message: `Try again later`,
      });
      setLoadingStatus("free");
    }
  };

  const handleBackToCourse = () => {
    router.push(`/course/${course.slug}`);
    setLoadingStatus("Redirecting");
  };

  const courseTopics = course.topics as ICourseTopic[];

  const buttonText =
    loadingStatus === "free"
      ? isEnrolled === "yes"
        ? "Back to Course"
        : "Enroll"
      : loadingStatus;

  return (
    <div className="max-w-5xl w-full mx-auto ">
      <CourseDetails course={course} />
      <CourseRatings ratings={course.ratings ?? []} />
      <LargeHeading size="sm">Course Topics</LargeHeading>
      <Accordion type="single" collapsible>
        {courseTopics.map((topic, index: number) => {
          const faviconURL = getFavicon(
            topic.versions[topic.versions.length - 1].source ?? ""
          );
          return (
            <AccordionItem
              value={index.toString()}
              key={index}
              className="m-4 px-4 md:mx-6"
            >
              <AccordionTrigger className="text-start">
                {topic.versions[topic.versions.length - 1].title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex space-x-2">
                  <img src={faviconURL} className="h-7 w-7" alt="og" />
                  <Paragraph
                    size="sm"
                    className="truncate-text-1-line font-semibold"
                  >
                    {topic.versions[topic.versions.length - 1].duration}m
                  </Paragraph>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      {isEnrolled !== "loading" && (
        <div className="fixed bottom-0 w-full max-w-5xl mx-auto">
          <div className="m-4 md:mx-6 mt-8">
            {!session?.user ? (
              <Button
                className="w-full py-6 text-lg font-bold"
                isLoading={loadingStatus !== "free"}
                onClick={() => signIn()}
              >
                Enroll
              </Button>
            ) : (
              <Button
                className="w-full py-6 text-lg font-bold"
                isLoading={loadingStatus !== "free"}
                onClick={() =>
                  isEnrolled === "yes"
                    ? handleBackToCourse()
                    : handleEnrollment()
                }
              >
                {buttonText}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseLandingPage;
