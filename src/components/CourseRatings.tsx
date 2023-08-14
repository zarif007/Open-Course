import React from "react";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import { PiShootingStarDuotone, PiStarDuotone } from "react-icons/pi";
import { Progress } from "@/components/ui/Progress";

const CourseRatings = () => {
  return (
    <div className="m-4 md:mx-6 mb-8">
      <div className="flex space-x-2 items-center">
        <LargeHeading size="sm">Ratings</LargeHeading>
        <PiShootingStarDuotone className="w-10 h-10" />
      </div>
      {new Array(5).fill(0).map((_, index) => (
        <ProgressBar key={index} value={(index + 1) * 10} index={5 - index} />
      ))}
    </div>
  );
};

const ProgressBar = ({ value, index }: { value: number; index: number }) => {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex space-x-2 items-center">
      <Paragraph className="font-semibold flex space-x-1 items-center">
        <span>{index}</span>
        <PiStarDuotone className="" />
      </Paragraph>
      <Progress value={progress} className="md:w-[50%]" />
    </div>
  );
};

export default CourseRatings;
