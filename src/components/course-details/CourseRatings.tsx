import React, { useEffect, useState } from "react";
import LargeHeading from "../ui/LargeHeading";
import Paragraph from "../ui/Paragraph";
import { PiShootingStarDuotone, PiStarDuotone } from "react-icons/pi";
import { RiUserStarFill } from "react-icons/ri";
import { Progress } from "@/components/ui/Progress";
import calculateAvgRating from "@/utils/calculateAvgRating";

const CourseRatings = ({
  reviews,
}: {
  reviews: { user: string; rating: number }[] | [];
}) => {
  const [ratingsRange, setRatingsRange] = useState<number[]>([
    0, 0, 0, 0, 0, 0,
  ]);

  const createRange = () => {
    const updated = [0, 0, 0, 0, 0, 0];
    reviews.map((review) => {
      updated[`${review.rating}`] += 1;
    });
    setRatingsRange(updated);
  };

  useEffect(() => {
    createRange();
  }, [reviews]);

  return (
    <div className="flex flex-col items-center my-3">
      <div className="flex space-x-2 items-center">
        <LargeHeading size="sm" className="text-center">
          Ratings ({calculateAvgRating(reviews)})
        </LargeHeading>
        <PiShootingStarDuotone className="w-10 h-10" />
      </div>
      {Array.from({ length: 5 }, (_, index) => (
        <ProgressBar
          key={index}
          value={ratingsRange[5 - index]}
          index={5 - index}
          total={reviews.length}
        />
      ))}
    </div>
  );
};

const ProgressBar = ({
  value,
  index,
  total,
}: {
  value: number;
  index: number;
  total: number;
}) => {
  return (
    <div className="flex space-x-2 justify-center items-center w-full md:w-[50%] w-[80%]">
      <Paragraph className={`w-1/12 font-semibold flex items-center`}>
        <span className="w-[50%]">{index}</span>
        <PiStarDuotone className="w-[50%]" />
      </Paragraph>
      <Progress value={(value / total) * 100} className="w-10/12" />
      <Paragraph className={`w-1/12 font-semibold flex space-x-1 items-center`}>
        <span className="">{value}</span>
        <RiUserStarFill className="" />
      </Paragraph>
    </div>
  );
};

export default CourseRatings;
