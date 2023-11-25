import React from "react";
import LargeHeading from "../ui/LargeHeading";
import { FcDisplay, FcDocument, FcLink, FcUpload } from "react-icons/fc";
import { Button } from "../ui/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setSelectedTopicType } from "@/redux/features/selected-topic-type";

const selectors = [
  {
    title: "Embed Link",
    type: "free_source_content",
    icon: <FcLink className="w-10 h-10" />,
    isDisabled: false,
  },
  {
    title: "Write Doc",
    type: "doc_content",
    icon: <FcDocument className="w-10 h-10" />,
    isDisabled: false,
  },
  {
    title: "Place Quiz",
    type: "quiz",
    icon: <FcDisplay className="w-10 h-10" />,
    isDisabled: true,
  },
  {
    title: "Upload Content",
    type: "quiz",
    icon: <FcUpload className="w-10 h-10" />,
    isDisabled: true,
  },
];

type ISelectedType = "" | "free_source_content" | "doc_content" | "quiz";

const CourseTopicSelector = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="animate-in slide-in-from-right duration-300 flex justify-center items-center flex-col my-24 space-y-3 h-full">
      {selectors.map((selector) => (
        <Button
          key={selector.title}
          disabled={selector.isDisabled}
          onClick={() =>
            dispatch(setSelectedTopicType(selector.type as ISelectedType))
          }
          variant="outline"
          className="flex items-center justify-center space-x-4 focus:ring-0 rounded w-72 md:w-80 h-16"
        >
          {selector.icon}
          <p className="font-bold text-2xl">{selector.title}</p>
        </Button>
      ))}
    </div>
  );
};

export default CourseTopicSelector;
