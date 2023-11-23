import React from "react";
import LargeHeading from "../ui/LargeHeading";
import { FcDisplay, FcDocument, FcGoogle } from "react-icons/fc";
import { Button } from "../ui/Button";

const selectors = [
  {
    title: "From URL",
    icon: <FcGoogle className="w-10 h-10" />,
  },
  {
    title: "Write Text",
    icon: <FcDocument className="w-10 h-10" />,
  },
  {
    title: "Place Quiz",
    icon: <FcDisplay className="w-10 h-10" />,
  },
];

const CourseTopicSelector = () => {
  return (
    <div className="flex justify-center items-center flex-col mt-4 mb-24 space-y-3 h-full">
      {selectors.map((selector) => (
        <Button
          key={selector.title}
          variant="outline"
          className="flex items-center justify-center space-x-4 rounded w-72 md:w-80 h-16"
        >
          {selector.icon}
          <p className="font-bold text-2xl">{selector.title}</p>
        </Button>
      ))}
    </div>
  );
};

export default CourseTopicSelector;
