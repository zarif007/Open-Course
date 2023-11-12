import React from "react";
import { Skeleton } from "../ui/Skeleton";

const HeatmapSkeleton = () => {
  return (
    <div className="flex flex-col mb-4 mt-8">
      {new Array(7).fill(0).map((_, index) => {
        return (
          <div key={index} className="flex">
            {new Array(45).fill(0).map((_, index) => {
              return (
                <Skeleton
                  key={index}
                  className="h-[8px] w-[8px] sm:h-[13px] sm:w-[13px] rounded-sm mr-[3px] mb-[3px]"
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default HeatmapSkeleton;
