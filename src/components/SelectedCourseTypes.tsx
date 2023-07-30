import React from "react";

const SelectedCourseTypes = ({
  selectedCourseTypes,
}: {
  selectedCourseTypes: string[];
}) => {
  return (
    <div className="flex my-2 flex-wrap">
      {selectedCourseTypes.map((selectedCourseType, index) => (
        <div
          key={index}
          className="w-fit p-1 m-1 text-xs font-semibold bg-gray-950 text-slate-200  dark:bg-slate-200 dark:text-gray-950 rounded-md"
        >
          {selectedCourseType}
        </div>
      ))}
    </div>
  );
};

export default SelectedCourseTypes;
