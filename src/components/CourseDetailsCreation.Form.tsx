import React, { useEffect, useState } from "react";
import { Input } from "./ui/Input";
import { Combobox } from "./ui/Combobox";
import { courseTypes } from "@/utils/courseTypes";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setCourseForCreation } from "@/redux/features/course-creation-slice";
import { Textarea } from "./ui/Textarea";
import { languages } from "@/utils/languages";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/Button";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { nextApi } from "@/utils/apiEndpoints";
import { ICourse } from "@/types/course";

const CourseDetailsCreationForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const course = useAppSelector(
    (state) => state.courseCreationReducer.value.course
  );

  const [show, setShow] = useState<boolean>(true);

  const { user } = useUser();

  const { theme } = useTheme();

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

  // const generatedBanner = `${nextApi}/generateBanner?courseName=${
  //   course.title
  // }&theme=${theme}&
  // &topics=${course.categories ? course.categories.join("  ") : ""}&creator=${
  //   user?.firstName
  // }&imgUrl=${user?.imageUrl}`;

  return (
    <React.Fragment>
      <div
        className="flex items-center w-fit cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <Button variant="link" className="border-0 p-0 focus:ring-0">
          Show {show ? "Less" : "More"}
        </Button>
        <ChevronDown
          className={`h-8 w-8 shrink-0 transition-transform duration-200 ${
            !show ? "rotate-180" : ""
          }`}
        />
      </div>
      <form
        className={`flex flex-col items-center space-y-3 ${!show && "blur-sm"}`}
        onClick={() => setShow(true)}
      >
        <div className="w-full">
          <label htmlFor="text" className="font-bold">
            Name of the Course
          </label>
          <Input
            className={`h-16 md:h-20 text-gray-950 dark:text-slate-100 text-4xl  md:text-6xl font-extrabold focus-visible:ring-0`}
            defaultValue={course.title}
            onChange={(e) =>
              dispatch(
                setCourseForCreation({ ...course, title: e.target.value })
              )
            }
          />
        </div>

        {show && (
          <React.Fragment>
            <div className="flex flex-col w-full">
              <label htmlFor="text" className="font-bold">
                Description
              </label>
              <Textarea
                placeholder="About this Course"
                className="focus-visible:ring-0`"
              />
            </div>
            <div className="w-full flex flex-wrap">
              <div className="mr-1 flex flex-col my-1">
                <label htmlFor="text" className="font-bold">
                  Category (Max. 3)
                </label>
                <Combobox
                  title="Category"
                  list={courseTypes}
                  currentValues={course.categories}
                  setCurrentValuesFunction={setSelectedCourseTypes}
                />
              </div>
              <div className="mr-1 flex flex-col my-1">
                <label htmlFor="text" className="font-bold">
                  Level (Max. 3)
                </label>
                <Combobox
                  title="Level"
                  list={["🌱 Beginner", "🚧 Intermediate", "🚀 Advance"]}
                  currentValues={course.levels}
                  setCurrentValuesFunction={setSelectedLevels}
                />
              </div>

              <div className="mr-1 flex flex-col my-1">
                <label htmlFor="text" className="font-bold">
                  Language (Max. 3)
                </label>
                <Combobox
                  title="Language"
                  list={languages}
                  currentValues={course.languages}
                  setCurrentValuesFunction={setSelectedLanguages}
                />
              </div>
            </div>
          </React.Fragment>
        )}
      </form>
    </React.Fragment>
  );
};

export default CourseDetailsCreationForm;
