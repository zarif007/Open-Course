import React, { useState } from "react";
import CourseDetailsCreationForm from "./CourseDetailsCreation.Form";
import SelectedTopics from "./SelectedTopics";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setCourseForCreation } from "@/redux/features/course-creation-slice";
import { ICourse } from "@/types/course";

const CourseDetailsCreation = () => {
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
    <div className="border-2 border-slate-200 dark:border-gray-900 rounded my-4 m-2 md:m-6 px-6 py-8">
      <CourseDetailsCreationForm />

      <div className="flex flex-wrap">
        {[
          {
            elements: course.categories,
            label: "Categories",
            setter: setSelectedCourseTypes,
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
