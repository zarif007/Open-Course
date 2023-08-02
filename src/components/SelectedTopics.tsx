import React from "react";

const SelectedTopics = ({
  selectedTopics,
}: {
  selectedTopics: string[];
}) => {
  return (
    <div className="flex my-2 flex-wrap">
      {selectedTopics.map((selectedTopic, index) => (
        <div
          key={index}
          className="w-fit p-1 m-1 ml-0 text-xs font-semibold bg-gray-950 text-slate-200  dark:bg-slate-200 dark:text-gray-950 rounded-md"
        >
          {selectedTopic}
        </div>
      ))}
    </div>
  );
};

export default SelectedTopics;
