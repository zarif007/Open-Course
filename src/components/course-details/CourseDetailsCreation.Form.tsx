import React from "react";
import { Input } from "../ui/Input";
import { Combobox } from "../ui/Combobox";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setCourseForCreation } from "@/redux/features/course-creation-slice";
import { Textarea } from "../ui/Textarea";
import { Switch } from "@/components/ui/Switch";
import { ICourse } from "@/types/course";
import { courseCategories, courseLevels, languages } from "@/constants/course";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { ImUnlocked } from "react-icons/im";
import { setCourseForUpdate } from "@/redux/features/course-update-slice";

const CourseDetailsCreationForm = ({
  mode,
  setSelectedCourseCategories,
  setSelectedLevels,
  setSelectedLanguages,
}: {
  mode: "creation" | "edit";
  setSelectedCourseCategories: (categories: string[]) => void;
  setSelectedLevels: (levels: string[]) => void;
  setSelectedLanguages: (languages: string[]) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const course = useAppSelector((state) =>
    mode === "creation"
      ? state.courseCreationReducer.value.course
      : state.courseUpdateReducer.value.course
  );

  const updateCourse = (course: ICourse) => {
    dispatch(
      mode === "creation"
        ? setCourseForCreation(course)
        : setCourseForUpdate(course)
    );
  };

  const handleSwitch = (
    value: boolean,
    attribute: "coursePrivacy" | "topicPrivacy"
  ) => {
    const vl =
      attribute === "coursePrivacy"
        ? value
          ? "public"
          : "private"
        : value
        ? "open"
        : "locked";
    const updatedCourse = {
      ...course,
      [attribute]: vl,
    };

    updateCourse(updatedCourse);
  };

  return (
    <form className={`flex flex-col items-center space-y-3 md:space-y-6`}>
      <div className="w-full">
        <label htmlFor="text" className="font-bold">
          Name of the Course
        </label>
        <Input
          className={`h-12 md:h-16 text-gray-950 dark:text-slate-100 text-2xl md:text-4xl border font-bold`}
          defaultValue={course.title}
          onChange={(e) => updateCourse({ ...course, title: e.target.value })}
        />
      </div>

      <div className="flex flex-col w-full">
        <label htmlFor="text" className="font-bold">
          Description
        </label>
        <Textarea
          defaultValue=""
          placeholder="About this course"
          className="text-lg font-semibold border"
          onChange={(e) =>
            updateCourse({ ...course, description: e.target.value })
          }
        />
      </div>

      <div className="grid gid-cols-1 md:grid-cols-2 gap-2 w-full">
        <div className="flex justify-between items-center px-4 py-2 border border-slate-300 dark:border-gray-800 rounded w-full">
          <div className="">
            <div className="flex space-x-1 items-center font-bold text-md">
              <ImUnlocked />
              <p>Course Privacy</p>
            </div>
            <div className="flex items-center space-x-1 font-semibold text-xs">
              <AiOutlineUnlock />
              <p>Public is accessible to everyone</p>
            </div>
            <div className="flex items-center space-x-1 font-semibold text-xs">
              <AiOutlineLock />
              <p>Private is invitation only</p>
            </div>
            <div
              className={`flex items-center space-x-1 font-semibold text-xs ${
                course.coursePrivacy === "public"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {course.coursePrivacy === "public" ? (
                <AiOutlineUnlock />
              ) : (
                <AiOutlineLock />
              )}
              <p>{course.coursePrivacy}</p>
            </div>
          </div>
          <Switch
            defaultChecked={course.coursePrivacy === "public"}
            onCheckedChange={(e) => handleSwitch(e, "coursePrivacy")}
          />
        </div>
        <div className="flex justify-between items-center px-4 py-2 border border-slate-300 dark:border-gray-800 rounded w-full">
          <div className="">
            <div className="flex space-x-1 items-center font-bold text-md">
              <ImUnlocked />
              <p>Topic Privacy</p>
            </div>
            <div className="flex items-center space-x-1 font-semibold text-xs">
              <AiOutlineUnlock />
              <p>Can view any topic any time</p>
            </div>
            <div className="flex items-center space-x-1 font-semibold text-xs">
              <AiOutlineLock />
              <p>Finish previous topic to view</p>
            </div>
            <div
              className={`flex items-center space-x-1 font-semibold text-xs ${
                course.topicPrivacy === "open"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {course.topicPrivacy === "open" ? (
                <AiOutlineUnlock />
              ) : (
                <AiOutlineLock />
              )}
              <p>{course.topicPrivacy}</p>
            </div>
          </div>
          <Switch
            defaultChecked={course.topicPrivacy === "open"}
            onCheckedChange={(e) => handleSwitch(e, "topicPrivacy")}
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-1">
        <div className=" flex flex-col my-1">
          <label htmlFor="text" className="font-bold">
            Category (Max. 3)
          </label>
          <Combobox
            limit={3}
            title="Category"
            list={courseCategories}
            currentValues={course.categories}
            setCurrentValuesFunction={setSelectedCourseCategories}
          />
        </div>
        <div className=" flex flex-col my-1">
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
        <div className=" flex flex-col my-1">
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
  );
};

export default CourseDetailsCreationForm;
