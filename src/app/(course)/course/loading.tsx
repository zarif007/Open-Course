import { Skeleton } from "@/components/ui/Skeleton";
import React from "react";

const Loading = () => {
  return (
    <section className="w-full max-w-8xl mx-auto h-full flex">
      <div className="w-3/12 mb-3 mt-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className={`h-20 w-full my-2`} />
        ))}
      </div>
      <div className="w-9/12 m-3 mt-2">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-10 w-80 mt-2" />
        <Skeleton className="h-14 w-[70%] mt-2 mb-6 mx-auto" />
        <Skeleton className="h-full w-full" />
      </div>
    </section>
  );
};

export default Loading;
