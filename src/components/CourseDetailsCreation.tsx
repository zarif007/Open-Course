import React, { useState } from "react";
import { Input } from "./ui/Input";
import LargeHeading from "./ui/LargeHeading";
import { Combobox } from "./ui/Combobox";
import { courseTypes } from '@/utils/courseTypes';

const CourseDetailsCreation = () => {
  const [selectedCourseTypes, setSelectedCourseTypes] = useState<string[]>([]);
  return (
    <div className=" border-slate-300 dark:border-gray-800 rounded my-4 p-3 md:p-6">
      <form className="flex flex-col items-center space-y-3">
        <div className="w-full">
          <label htmlFor="text" className="font-bold">
            Name of the Course
          </label>
          {/* <Input
            defaultValue="New course on Dragon 🐉"
            className="my-1 h-10 text-lg bg-gray-950 text-slate-200  dark:bg-slate-200 dark:text-gray-950 rounded-md"
          /> */}
          <Input className="h-16 md:h-20 border-0 text-gray-950 dark:text-slate-100 text-4xl  md:text-6xl font-extrabold focus-visible:ring-0 p-0" defaultValue="Dragon Training 🐉" />
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="text" className="font-bold">
            Course Category (Max. 3)
          </label>
          <Combobox title="Category" list={courseTypes} currentValues={selectedCourseTypes} setCurrentValues={setSelectedCourseTypes} />
        </div>
      </form>
      <div className="flex my-2 flex-wrap">
      {
        selectedCourseTypes.map((selectedCourseType, index) => (
          <div key={index} className="w-fit p-1 m-1 text-xs font-semibold bg-gray-950 text-slate-200  dark:bg-slate-200 dark:text-gray-950 rounded-md">
            {selectedCourseType}
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default CourseDetailsCreation;
