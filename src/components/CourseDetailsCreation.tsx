import React, { useState } from "react";
import CourseDetailsCreationForm from "./CourseDetailsCreation.Form";
import SelectedTopics from "./SelectedTopics";

const CourseDetailsCreation = () => {
  
  const [selectedCourseTypes, setSelectedCourseTypes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  return (
    <div className=" border-slate-300 dark:border-gray-800 rounded my-4 p-3 md:p-6">
      <CourseDetailsCreationForm
        selectedCourseTypes={selectedCourseTypes}
        setSelectedCourseTypes={setSelectedCourseTypes}
        selectedLevels={selectedLevels}
        setSelectedLevels={setSelectedLevels}
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
      />

      <SelectedTopics selectedTopics={selectedCourseTypes} />
      <SelectedTopics selectedTopics={selectedLevels} />
      <SelectedTopics selectedTopics={selectedLanguages} />
    </div>
  );
};

export default CourseDetailsCreation;
