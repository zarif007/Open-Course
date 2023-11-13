import React from "react";
import { Skeleton } from "../ui/Skeleton";

const AsksSkeleton = () => {
  return (
    <div className="flex flex-col space-y-2">
      {new Array(5).fill(0).map((_, index) => (
        <Skeleton key={index} className="h-32 w-full" />
      ))}
    </div>
  );
};

export default AsksSkeleton;
