"use client";

import React from "react";
import LargeHeading from "../ui/LargeHeading";
import Typewriter from "react-ts-typewriter";
import { courseCategories } from "@/constants/course";

function shuffleArray(array: string[]) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
}

const CourseCategoriesRotation = () => {
  return (
    <LargeHeading size="sm" className="truncate">
      <Typewriter text={shuffleArray(courseCategories)} delay={1000} />
    </LargeHeading>
  );
};

export default CourseCategoriesRotation;
