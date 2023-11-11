import React from "react";
import { Skeleton } from "../ui/Skeleton";

const CourseCardShortSkeleton = () => {
  return (
    <div className="my-2 h-full border-2 border-slate-300 dark:border-gray-800 rounded-lg overflow-hidden">
      <Skeleton className="h-36 w-full" />
      <div className="p-6 pt-2 pb-4">
        <h2 className="tracking-widest text-xs title-font font-bold text-gray-500 mb-1">
          <Skeleton className="w-[100px]" />
        </h2>

        <Skeleton className="h-[24px] w-[300px] mb-2" />

        <div className="flex space-x-2 my-3">
          <Skeleton className="h-[20px] w-[120px]" />
        </div>

        <div
          className="w-full max-w-5xl mx-auto"
          style={{
            borderTop: "2px dashed #f43f5e",
            height: "2px",
            marginTop: "12px",
          }}
        />

        <div className="flex space-x-2 my-3">
          <Skeleton className="h-[20px] w-[24px]" />
          <Skeleton className="h-[20px] w-[24px]" />
          <Skeleton className="h-[20px] w-[24px]" />
        </div>

        <Skeleton className="h-[40px] w-full mt-3" />
      </div>
    </div>
  );
};

export default CourseCardShortSkeleton;
