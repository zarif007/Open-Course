import React, { useState } from "react";
import CourseDetailsCreationForm from "./CourseDetailsCreation.Form";
import SelectedTopics from "./SelectedTopics";
import { formatSelectedLevels } from "@/utils/formatSelectedLevels";

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
              selectedTopics={formatSelectedLevels(selectedLevels)}
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
