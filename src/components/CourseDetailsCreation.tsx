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
    <div className="bg-slate-200 dark:bg-gray-900 rounded my-4 m-2 md:m-6 p-4">
      <CourseDetailsCreationForm />

      <div className="flex flex-wrap">
        {course.categories && course.categories.length > 0 && (
          <div className="m-1">
            <label className="font-semibold">Categories</label>
            <SelectedTopics
              selectedTopics={course.categories}
              mode="creation"
              setSelectedTopics={setSelectedCourseTypes}
            />
          </div>
        )}
        {course.levels && course.levels.length > 0 && (
          <div className="m-1">
            <label className="font-semibold">Levels</label>
            <SelectedTopics
              selectedTopics={course.levels}
              mode="creation"
              setSelectedTopics={setSelectedLevels}
            />
          </div>
        )}
        {(course.languages && course.languages.length) > 0 && (
          <div className="m-1">
            <label className="font-semibold">languages</label>
            <SelectedTopics
              selectedTopics={course.languages}
              mode="creation"
              setSelectedTopics={setSelectedLanguages}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailsCreation;
