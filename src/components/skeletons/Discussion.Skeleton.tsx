import React from "react";
import { Skeleton } from "../ui/Skeleton";

const DiscussionSkeleton = () => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((elm) => {
        return (
          <div key={elm} className="my-3 p-3 flex space-x-3">
            <Skeleton className="rounded-full h-10 w-10" />
            <div className="flex flex-col space-y-1 w-full mt-2">
              <div className="flex items-end space-x-2 mb-2">
                <Skeleton className="w-24 md:w-40 h-4" />
                <Skeleton className="w-16 md:w-28 h-3" />
              </div>
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-[75%] h-4" />
              <Skeleton className="w-[90%] h-4" />
              <Skeleton className="w-[40%] h-4" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DiscussionSkeleton;
