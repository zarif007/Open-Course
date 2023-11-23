import React from "react";
import LargeHeading from "../ui/LargeHeading";
import { FcDisplay, FcDocument, FcGoogle, FcUpload } from "react-icons/fc";
import { Button } from "../ui/Button";

const selectors = [
  {
    title: "From URL",
    type: "free_source_content",
    icon: <FcGoogle className="w-10 h-10" />,
  },
  {
    title: "Write Text",
    type: "text_content",
    icon: <FcDocument className="w-10 h-10" />,
  },
  {
    title: "Place Quiz",
    type: "quiz",
    icon: <FcDisplay className="w-10 h-10" />,
  },
  {
    title: "Upload Content",
    type: "quiz",
    icon: <FcUpload className="w-10 h-10" />,
  },
];

type ISelectedType = "" | "free_source_content" | "text_content" | "quiz";

const CourseTopicSelector = ({
  selectedType,
  setSelectedType,
}: {
  selectedType: ISelectedType;
  setSelectedType: React.Dispatch<React.SetStateAction<ISelectedType>>;
}) => {
  return (
    <div className="flex justify-center items-center flex-col mt-4 mb-24 space-y-3 h-full">
      {selectors.map((selector) => (
        <Button
          key={selector.title}
          onClick={() => setSelectedType(selector.type as ISelectedType)}
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
