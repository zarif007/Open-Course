import React from 'react';
import { Skeleton } from '../ui/Skeleton';

const CourseUpdatePageSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-auto pt-8 flex flex-col space-y-1 items-center">
      <Skeleton className="font-bold text-md w-full h-32" />
      <Skeleton className="font-bold text-md w-full h-32" />
      <Skeleton className="font-bold text-md w-full h-32" />
      <Skeleton className="font-bold text-md w-full h-32" />
    </div>
  );
};

export default CourseUpdatePageSkeleton;
