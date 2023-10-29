import React from "react";
import { Skeleton } from "../ui/Skeleton";

const CourseCardSkeleton = () => {
  return (
    <div className="my-2 h-full border-2 border-slate-300 dark:border-gray-800 rounded-lg overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <h2 className="tracking-widest text-xs title-font font-bold text-gray-500 mb-1">
          <Skeleton className="w-[100px]" />
        </h2>
        <Skeleton className="h-[24px] w-[200px] mb-2" />
        <Skeleton className="h-[16px] w-[150px] mb-2" />
        <Skeleton className="h-[16px] w-[300px] mb-2" />

        <div
          className="w-full max-w-5xl mx-auto"
          style={{
            borderTop: "2px dashed #f43f5e",
            height: "2px",
            marginTop: "12px",
          }}
        />

        <div className="flex space-x-2 mt-4">
          <Skeleton className="h-[20px] w-[24px] mb-2" />
          <Skeleton className="h-[20px] w-[24px] mb-2" />
          <Skeleton className="h-[20px] w-[24px] mb-2" />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                className={`h-7 w-7 rounded-full ${index !== 0 && "-ml-2"}`}
              />
            ))}
          </div>

          <Skeleton className="h-5 w-16 font-semibold text-gray-500" />
        </div>

        <div className="flex justify-end text-gray-500 items-center space-x-2">
          <Skeleton className="w-[24px] h-[24px]" />
          <Skeleton className="w-[30px] h-[16px]" />
          <Skeleton className="w-[30px] h-[16px]" />
          <Skeleton className="w-[30px] h-[16px]" />
        </div>
        <Skeleton className="h-[40px] w-full mt-3" />
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
