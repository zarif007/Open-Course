import React, { useEffect } from "react";
import { Input } from "./ui/Input";
import { Combobox } from "./ui/Combobox";
import { courseTypes } from "@/utils/courseTypes";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setCourseForCreation } from "@/redux/features/course-creation-slice";
import { Textarea } from "./ui/Textarea";
import { languages } from "@/utils/languages";
import SelectedCourseTypes from "./SelectedTopics";


const CourseDetailsCreationForm = ({
  selectedCourseTypes,
  setSelectedCourseTypes,
  selectedLevels, 
  setSelectedLevels,
  selectedLanguages,
  setSelectedLanguages
}: {
  selectedCourseTypes: string[];
  setSelectedCourseTypes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedLevels: string[];
  setSelectedLevels: React.Dispatch<React.SetStateAction<string[]>>;
  selectedLanguages: string[];
  setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>;
}) => {

  const dispatch = useDispatch<AppDispatch>();

  const course = useAppSelector((state) => state.courseCreationReducer.value.course);

  useEffect(() => {
    dispatch(setCourseForCreation({ ...course, categories: selectedCourseTypes, 
      levels: selectedLevels, languages: selectedLanguages }));
  }, [selectedCourseTypes, selectedLevels, selectedLanguages]);

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

        <div className="flex flex-col w-full">
          <label htmlFor="text" className="font-bold">
            Description 
          </label>
          <Textarea placeholder="About this Course" className="" />
        </div>

        <div className="w-full flex flex-wrap">
          <div className="mr-1 flex flex-col my-1">
            <label htmlFor="text" className="font-bold">
              Level 
            </label>
            <Combobox
              title="Level"
              list={["🌱 Beginner", " 🚧 Intermediate", "🚀 Advance"]}
              currentValues={selectedLevels}
              setCurrentValues={setSelectedLevels}
            />
          </div>

          <div className="mr-1 flex flex-col my-1">
            <label htmlFor="text" className="font-bold">
              Language
            </label>
            <Combobox
              title="Language"
              list={languages}
              currentValues={selectedLanguages}
              setCurrentValues={setSelectedLanguages}
            />
          </div>

          <div className="mr-1 flex flex-col my-1">
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

        </div>
      </form>
    </React.Fragment>
  );
};

export default CourseDetailsCreationForm;
