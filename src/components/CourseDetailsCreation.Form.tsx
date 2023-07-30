import React, { useEffect } from "react";
import { Input } from "./ui/Input";
import { Combobox } from "./ui/Combobox";
import { courseTypes } from "@/utils/courseTypes";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setCourseForCreation } from "@/redux/features/course-creation-slice";

const CourseDetailsCreationForm = ({
  selectedCourseTypes,
  setSelectedCourseTypes,
}: {
  selectedCourseTypes: string[];
  setSelectedCourseTypes: React.Dispatch<React.SetStateAction<string[]>>;
}) => {

  const dispatch = useDispatch<AppDispatch>();

  const course = useAppSelector((state) => state.courseCreationReducer.value.course);

  useEffect(() => {
    dispatch(setCourseForCreation({ ...course, categories: selectedCourseTypes }));
  }, [selectedCourseTypes])

  return (
    <React.Fragment>
      <form className="flex flex-col items-center space-y-3">
        <div className="w-full">
          <label htmlFor="text" className="font-bold">
            Name of the Course
          </label>
          <Input
            className={`h-16 md:h-20 border-0 text-gray-950 dark:text-slate-100 text-4xl  md:text-6xl font-extrabold focus-visible:ring-0 p-0`}
            defaultValue={course.title}
            onChange={(e) => dispatch(setCourseForCreation({ ...course, title: e.target.value }))}
          />
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="text" className="font-bold">
            Course Category (Max. 3)
          </label>
          <Combobox
            title="Category"
            list={courseTypes}
            currentValues={selectedCourseTypes}
            setCurrentValues={setSelectedCourseTypes}
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default CourseDetailsCreationForm;
