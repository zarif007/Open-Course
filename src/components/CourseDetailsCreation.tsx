import React, { useState } from "react";
import CourseDetailsCreationForm from "./CourseDetailsCreation.Form";
import SelectedTopics from "./SelectedTopics";
import { formatSelectedLevels } from "@/utils/formatSelectedLevels";
import ErrorMessage from "./ui/ErrorMessage";

const CourseDetailsCreation = () => {
  const [selectedCourseTypes, setSelectedCourseTypes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  return (
    <div className="bg-slate-200 dark:bg-gray-900 rounded my-4 m-3 md:m-6 p-4">
      <CourseDetailsCreationForm
        selectedCourseTypes={selectedCourseTypes}
        setSelectedCourseTypes={setSelectedCourseTypes}
        selectedLevels={selectedLevels}
        setSelectedLevels={setSelectedLevels}
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
      />

      <div className="flex flex-wrap">
        {selectedCourseTypes.length > 0 && (
          <div className="m-1">
            <label className="font-semibold">Categories</label>
            <SelectedTopics
              selectedTopics={selectedCourseTypes}
              mode="creation"
              setSelectedTopics={setSelectedCourseTypes}
            />
          </div>
        )}
        {selectedLevels.length > 0 && (
          <div className="m-1">
            <label className="font-semibold">Levels</label>
            <SelectedTopics
              selectedTopics={selectedLevels}
              mode="creation"
              setSelectedTopics={setSelectedLevels}
            />
          </div>
        )}
        {selectedLanguages.length > 0 && (
          <div className="m-1">
            <label className="font-semibold">languages</label>
            <SelectedTopics
              selectedTopics={selectedLanguages}
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
