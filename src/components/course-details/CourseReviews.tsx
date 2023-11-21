import React from "react";

const CourseReviews = ({
  reviews,
}: {
  reviews: { user: string; rating: number; comment: string }[] | [];
}) => {
  console.log(reviews);
  return (
    <div className="m-4 px-4 md:mx-6">
      <p className="text-lg font-bold">Comments</p>
      <div className="flex"></div>
    </div>
  );
};

export default CourseReviews;
