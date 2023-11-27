/* eslint-disable @next/next/no-img-element */
"use client";

import React, { ReactNode, useEffect, useState } from "react";

import LargeHeading from "../ui/LargeHeading";
import CourseDetails from "../course-details/CourseDetails";

import CourseRatings from "./CourseRatings";
import { ICourse } from "@/types/course";
import { ICourseTopic } from "@/types/courseTopic";
import { IEnrollState } from "@/types/enrollState";

import CourseReviews from "./CourseReviews";
import { PiStackDuotone } from "react-icons/pi";
import CourseTopicsAccordion from "./CourseTopics.Accordion";
import CourseEnrollmentButton from "./Course.EnrollmentButton";
import CourseLandingSideWidget from "./CourseLanding.SideWidget";

const CourseLandingPage = ({
  course,
  enrollState,
}: {
  course: ICourse;
  enrollState: IEnrollState | null;
}) => {
  const courseTopics = course.topics as ICourseTopic[];

  return (
    <div className="max-w-5xl w-full mx-auto">
      <CourseLandingSideWidget course={course} />
      <CourseDetails course={course} />
      <CourseRatings reviews={course.reviews ?? []} />
      <div className="flex space-x-2 items-center justify-center mt-8">
        <LargeHeading size="sm" className="text-center">
          Course Topics ({course.topics.length})
        </LargeHeading>
        <PiStackDuotone className="w-10 h-10" />
      </div>
      <CourseTopicsAccordion courseTopics={courseTopics} />
      <CourseReviews reviews={course.reviews ?? []} />
      <CourseEnrollmentButton course={course} enrollState={enrollState} />
    </div>
  );
};

export default CourseLandingPage;
