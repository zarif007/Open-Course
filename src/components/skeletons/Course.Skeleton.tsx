import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

const CourseSkeleton = () => {
  return (
    <section className="w-full max-w-8xl mx-auto h-full flex">
      <div className="w-3/12 mb-3 mt-0 hidden md:flex flex-col">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className={`h-20 w-full my-2 ${
              index == 2 && "border-2 border-rose-500"
            }`}
          />
        ))}
      </div>
      <div className="md:w-9/12 w-full m-3 mt-2">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-10 w-80 my-2" />
        <Skeleton className="h-96 w-full" />
      </div>
    </section>
  );
};

export default CourseSkeleton;
