import React, { useEffect, useState } from "react";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import { PiShootingStarDuotone, PiStarDuotone } from "react-icons/pi";
import { RiUserStarFill } from "react-icons/ri";
import { Progress } from "@/components/ui/Progress";
import calculateAvgRating from "@/utils/calculateAvgRating";

const CourseRatings = ({
  ratings,
}: {
  ratings: { user: string; rating: number }[] | [];
}) => {
  const [ratingsRange, setRatingsRange] = useState<number[]>([0, 0, 0, 0, 0, 0])

  const createRange = () => {
    const updated = [0, 0, 0, 0, 0, 0];
    ratings.map(rating => {
      updated[`${rating.rating}`] += 1
    })
    setRatingsRange(updated)
  };

  useEffect(() => {
    createRange();
  }, [ratings]);

  return (
    <div className="m-4 md:mx-6 mb-8">
      <div className="flex space-x-2 items-center">
        <LargeHeading size="sm">Ratings ({calculateAvgRating(ratings)})</LargeHeading>
        <PiShootingStarDuotone className="w-10 h-10" />
      </div>
      {
        Array.from({ length: 5 }, (_, index) => (
          <ProgressBar key={index} value={ratingsRange[5 - index]} index={5 - index} total={ratings.length} />
        ))
      }
    </div>
  );
};

const ProgressBar = ({ value, index, total }: { value: number; index: number, total: number }) => {
  return (
    <div className="flex space-x-2 items-center">
      <Paragraph className={`font-semibold flex space-x-1 items-center ${index === 1 && 'pl-[3px]'}`}>
        <span>{index}</span>
        <PiStarDuotone className="" />
      </Paragraph>
      <Progress value={(value / total) * 100} className="md:w-[50%]" />
      <Paragraph className={`font-semibold flex space-x-1 items-center`}>
        <span>{value}</span>
        <RiUserStarFill className="" />
      </Paragraph>
    </div>
  );
};

export default CourseRatings;
