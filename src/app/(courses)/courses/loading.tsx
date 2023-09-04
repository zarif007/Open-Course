import CourseCardSkeleton from "@/components/skeletons/CourseCard.Skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {new Array(12).fill(0).map((_, index) => (
        <div key={index} className="px-3 pb-3">
          <CourseCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export default Loading;
