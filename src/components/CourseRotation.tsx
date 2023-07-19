import { courseTypes } from "@/utils/courseTypes";
import React, { useEffect, useState } from "react";
import LargeHeading from "./ui/LargeHeading";

const CourseRotation = () => {
  const [currentCourseType, setCurrentCourseType] = useState(
    courseTypes.length > 0 ? courseTypes[0] : null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCourseType(
        courseTypes[Math.floor(Math.random() * courseTypes.length)]
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return <LargeHeading size="sm">{currentCourseType}</LargeHeading>;
};

export default CourseRotation;
