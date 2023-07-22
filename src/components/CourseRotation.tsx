import { courseTypes } from "@/utils/courseTypes";
import React, { useEffect, useState } from "react";
import LargeHeading from "./ui/LargeHeading";
import Typewriter from "react-ts-typewriter";

const CourseRotation = () => {
  return (
    <LargeHeading size="sm" className="truncate">
      <Typewriter text={courseTypes} delay={1000} />
    </LargeHeading>
  );
};

export default CourseRotation;
