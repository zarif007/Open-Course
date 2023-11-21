import React from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Skeleton } from "@/components/ui/Skeleton";

const CourseLandingSkeleton = () => {
  return (
    <div className="max-w-5xl w-full mx-auto ">
      <div className="flex flex-col justify-start p-3 md:p-6">
        <Skeleton className="text-center underline decoration-rose-500 decoration-4 h-12 w-full md:w-[70%] my-4 mx-auto" />

        <div className="flex space-x-2 items-center mx-auto">
          <Skeleton className="font-bold text-md" />
          <Skeleton className="h-10 w-10 rounded-full border-2 p-[2px] border-rose-500" />
          <Skeleton className="font-bold text-md" />
        </div>

        <div className="md:w-[50%] mx-auto">
          <Skeleton />
        </div>
      </div>

      <div className="flex justify-center mb-4 items-center space-x-2">
        <Skeleton className="h-8 w-20 md:w-32 rounded" />
        <Skeleton className="h-8 w-20 md:w-32 rounded" />
        <Skeleton className="h-8 w-20 md:w-32 rounded" />
      </div>

      <div className="flex items-center justify-center">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            className={`h-7 w-7 rounded-full ${index !== 0 && "-ml-2"}`}
          />
        ))}
      </div>

      <div className="flex space-x-2 justify-center items-center w-full">
        <Skeleton className={`font-semibold flex space-x-1 items-center`} />
        <Skeleton className="w-md max-w-lg" />
        <Skeleton className={`font-semibold flex space-x-1 items-center`} />
      </div>

      <Accordion type="single" collapsible>
        {[1, 2, 3].map((_, index) => (
          <Skeleton key={index} className="m-4 px-4 md:mx-6 h-16" />
        ))}
      </Accordion>

      <Skeleton className="text-center underline decoration-rose-500 decoration-4 h-8 w-[70%] md:w-[30%] my-4 mx-auto" />
      <div className="mx-auto">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <Skeleton
            key={index}
            className="mx-auto my-2 h-5 w-[80%] md:w-[50%]"
          />
        ))}
      </div>
    </div>
  );
};

export default CourseLandingSkeleton;
