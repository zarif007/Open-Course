import React from "react";
import LargeHeading from "../ui/LargeHeading";
import { PiChatCenteredTextDuotone } from "react-icons/pi";
import { IUser } from "@/types/user";
import { FaStar } from "react-icons/fa6";

const CourseReviews = ({
  reviews,
}: {
  reviews: { user: IUser | string; rating: number; comment: string }[] | [];
}) => {
  return (
    <div className="m-4 px-4 md:mx-6">
      <div className="flex space-x-2 items-center justify-center mt-8">
        <LargeHeading size="sm" className="text-center">
          Reviews ({reviews.length})
        </LargeHeading>
        <PiChatCenteredTextDuotone className="w-10 h-10" />
      </div>
      <div className="flex flex-col w-full space-y-4 my-6">
        {reviews.map((review, index) => {
          const author = review.user as IUser;
          return (
            <div key={index} className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <img src={author.image} className="w-10 h-10 rounded-full" />
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold">{author.name}</p>
                  <div className="flex space-x-1 items-center text-yellow-500">
                    <p className="text-sm font-semibold ">{review.rating}</p>
                    <FaStar />
                  </div>
                </div>
              </div>
              <p className="ml-12 font-semibold">{review.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseReviews;
