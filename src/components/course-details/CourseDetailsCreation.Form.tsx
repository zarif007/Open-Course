import React, { useEffect, useState } from "react";
import { Input } from "../ui/Input";
import { Combobox } from "../ui/Combobox";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setCourseForCreation } from "@/redux/features/course-creation-slice";
import { Textarea } from "../ui/Textarea";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { useTheme } from "next-themes";
import { ICourse } from "@/types/course";
import { courseCategories, courseLevels, languages } from "@/constants/course";

const CourseDetailsCreationForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const course = useAppSelector(
    (state) => state.courseCreationReducer.value.course
  );

  const updateCourse = (course: ICourse) => {
    dispatch(setCourseForCreation(course));
  };

  const setSelectedCourseTypes = (categories: string[]) => {
    updateCourse({
      ...course,
      categories,
    });
  };
  const setSelectedLevels = (levels: string[]) => {
    updateCourse({
      ...course,
      levels,
    });
  };
  const setSelectedLanguages = (languages: string[]) => {
    updateCourse({
      ...course,
      languages,
    });
  };

  return (
    <React.Fragment>
      <form className={`flex flex-col items-center space-y-3`}>
        <div className="w-full">
          <label htmlFor="text" className="font-bold">
            Name of the Course
          </label>
          <Input
            className={`h-16 md:h-20 text-gray-950 dark:text-slate-100 text-4xl  md:text-6xl font-extrabold`}
            defaultValue={course.title}
            onChange={(e) =>
              dispatch(
                setCourseForCreation({ ...course, title: e.target.value })
              )
            }
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="text" className="font-bold">
            Description
          </label>
          <Textarea
            defaultValue=""
            placeholder="About this course"
            className="text-lg font-semibold"
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-1">
          <div className="mr-1 flex flex-col my-1">
            <label htmlFor="text" className="font-bold">
              Category (Max. 3)
            </label>
            <Combobox
              limit={3}
              title="Category"
              list={courseCategories}
              currentValues={course.categories}
              setCurrentValuesFunction={setSelectedCourseTypes}
            />
          </div>
          <div className="mr-1 flex flex-col my-1">
            <label htmlFor="text" className="font-bold">
              Level (Max. 3)
            </label>
            <Combobox
              limit={3}
              title="Level"
              list={courseLevels}
              currentValues={course.levels}
              setCurrentValuesFunction={setSelectedLevels}
            />
          </div>
          <div className="mr-1 flex flex-col my-1">
            <label htmlFor="text" className="font-bold">
              Language (Max. 3)
            </label>
            <Combobox
              limit={3}
              title="Language"
              list={languages}
              currentValues={course.languages}
              setCurrentValuesFunction={setSelectedLanguages}
            />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CourseDetailsCreationForm;
