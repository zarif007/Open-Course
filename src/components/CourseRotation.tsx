import { courseTypes } from "@/utils/courseTypes";
import React, { useEffect, useState } from "react";
import LargeHeading from "./ui/LargeHeading";

const CourseRotation = () => {
  const [counter, setCounter] = useState<number>(0);

  const [currentCourseType, setCurrentCourseType] = useState(
    courseTypes[counter]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCourseType(courseTypes[(counter + 1) % courseTypes.length]);
      setCounter(counter + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [counter]);
  return <LargeHeading size="sm">{currentCourseType}</LargeHeading>;
};

export default CourseRotation;
