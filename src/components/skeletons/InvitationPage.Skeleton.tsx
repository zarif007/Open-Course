import React from "react";
import LargeHeading from "../ui/LargeHeading";
import { Skeleton } from "../ui/Skeleton";
import Paragraph from "../ui/Paragraph";
import { Button } from "../ui/Button";

const InvitationPageSkeleton = () => {
  return (
    <div className="w-full max-w-5xl h-full flex flex-col justify-center items-center mx-auto my-16">
      <div className="w-full max-w-xl flex flex-col justify-center items-center mx-2 space-y-2">
        <Skeleton className="w-full h-10" />
        <Skeleton className="h-[250px] w-full rounded" />
        <Skeleton className="w-[80%] h-6" />

        <Skeleton className="w-full h-10" />

        <Skeleton className="w-full h-10" />
      </div>
    </div>
  );
};

export default InvitationPageSkeleton;
