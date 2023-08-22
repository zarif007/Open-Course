import CourseSkeleton from "@/components/Skeletons/Course.Skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {new Array(12).fill(0).map((_, index) => (
        <CourseSkeleton key={index} />
      ))}
    </div>
  );
};

export default Loading;
