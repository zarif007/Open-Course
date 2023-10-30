import React, { useState } from "react";
import CourseDetailsCreationForm from "./CourseDetailsCreation.Form";
import SelectedTopics from "./SelectedTopics";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setCourseForCreation } from "@/redux/features/course-creation-slice";
import { ICourse } from "@/types/course";
import { setCourseForUpdate } from "@/redux/features/course-update-slice";

const CourseDetailsCreation = ({ mode }: { mode: "creation" | "edit" }) => {
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

  const setSelectedCourseCategories = (categories: string[]) => {
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
    <div className="border-2 border-slate-200 dark:border-gray-900 rounded my-4 m-2 md:m-6 px-6 py-8">
      <CourseDetailsCreationForm
        mode={mode}
        setSelectedCourseCategories={setSelectedCourseCategories}
        setSelectedLevels={setSelectedLevels}
        setSelectedLanguages={setSelectedLanguages}
      />

      <div className="flex flex-wrap">
        {[
          {
            elements: course.categories,
            label: "Categories",
            setter: setSelectedCourseCategories,
          },
          {
            elements: course.levels,
            label: "Levels",
            setter: setSelectedLevels,
          },
          {
            elements: course.languages,
            label: "Languages",
            setter: setSelectedLanguages,
          },
        ].map((item) => (
          <React.Fragment key={item.label}>
            {item.elements.length > 0 && (
              <div className="m-1">
                <label className="font-semibold">{item.label}</label>
                <SelectedTopics
                  selectedTopics={item.elements}
                  mode="creation"
                  setSelectedTopics={item.setter}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CourseDetailsCreation;
