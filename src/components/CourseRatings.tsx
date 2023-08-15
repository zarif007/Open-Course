import React, { useEffect } from "react";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import { PiShootingStarDuotone, PiStarDuotone } from "react-icons/pi";
import { Progress } from "@/components/ui/Progress";

const CourseRatings = ({
  ratings,
}: {
  ratings: { user: string; rating: number }[] | [];
}) => {
  const ratingsRange: number[] = [0, 0, 0, 0, 0, 0];
  const createRange = () => {
    ratings.map((rating) => {
      ratingsRange[`${rating.rating}`] = ratingsRange[`${rating.rating}`] + 1;
    });
  };
  useEffect(() => {
    createRange();
    console.log(ratingsRange, ratings);
  }, [ratings]);
  return (
    <div className="m-4 md:mx-6 mb-8">
      <div className="flex space-x-2 items-center">
        <LargeHeading size="sm">Ratings</LargeHeading>
        <PiShootingStarDuotone className="w-10 h-10" />
      </div>
      {ratingsRange.map((value, index) => (
        <ProgressBar key={index} value={value} index={5 - index} />
      ))}
    </div>
  );
};

const ProgressBar = ({ value, index }: { value: number; index: number }) => {
  const [progress, setProgress] = React.useState(10);
  console.log(value);
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
