import React from "react";
import { Skeleton } from "../ui/Skeleton";

const CourseCardDashboardSkeleton = () => {
  return (
    <div className="my-2 h-full border-2 border-slate-300 dark:border-gray-800 rounded-lg overflow-hidden">
      <Skeleton className="h-36 w-full" />
      <div className="p-6 pt-2 pb-4">
        <Skeleton className="h-[24px] w-[200px] mb-3" />
        {/* <Skeleton className="h-[16px] w-[150px] mb-2" /> */}
        <Skeleton className="h-[36px] w-[300px] my-2" />

        <div className="flex justify-end">
          <Skeleton className="h-[24px] w-[60px]" />
        </div>

        <Skeleton className="h-[40px] w-full mt-3" />
      </div>
    </div>
  );
};

export default CourseCardDashboardSkeleton;
