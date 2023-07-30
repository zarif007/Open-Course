import React, { useState } from "react";
import CourseDetailsCreationForm from "./CourseDetailsCreation.Form";
import SelectedCourseTypes from "./SelectedCourseTypes";

const CourseDetailsCreation = () => {
  
  const [selectedCourseTypes, setSelectedCourseTypes] = useState<string[]>([]);

  return (
    <div className=" border-slate-300 dark:border-gray-800 rounded my-4 p-3 md:p-6">
      <CourseDetailsCreationForm
        selectedCourseTypes={selectedCourseTypes}
        setSelectedCourseTypes={setSelectedCourseTypes}
      />

      <SelectedCourseTypes selectedCourseTypes={selectedCourseTypes} />
    </div>
  );
};

export default CourseDetailsCreation;
