import React from "react";
import { MdOutlineCancel } from "react-icons/md";

type Props = {
  selectedTopics: string[];
} & (
  | {
      mode: "view";
    }
  | {
      mode: "creation";
      setSelectedTopics: (values: string[]) => void;
    }
);

const SelectedTopics = (props: Props) => {
  const handleClick = (selectedTopic: string) => {
    if (props.mode === "creation") {
      props.setSelectedTopics(
        props.selectedTopics.filter((topic) => topic !== selectedTopic)
      );
    }
  };
  return (
    <div className="flex my-2 flex-wrap">
      {props.selectedTopics &&
        props.selectedTopics.map((selectedTopic, index) => (
          <div
            key={index}
            className="w-fit p-1 m-1 ml-0 text-xs font-semibold bg-gray-950 text-slate-200  dark:bg-slate-200 dark:text-gray-950 rounded-md flex space-x-2 items-center"
          >
            <span>{selectedTopic}</span>
            {props.mode === "creation" && (
              <MdOutlineCancel
                onClick={() => handleClick(selectedTopic)}
                className="cursor-pointer h-4 w-4 text-slate-300 dark:text-gray-800"
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default SelectedTopics;
