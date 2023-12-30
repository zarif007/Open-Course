import { nextApiEndPoint } from '@/utils/apiEndpoints';
import calculateAvgRating from '@/utils/calculateAvgRating';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { PiShootingStarDuotone } from 'react-icons/pi';

const CourseRating = ({ courseId }: { courseId: string }) => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: [`course-rating-star-${courseId}`],
    queryFn: async () => {
      const { data } = await (
        await fetch(`${nextApiEndPoint}/courseReview/forCard/${courseId}`)
      ).json();

      console.log(data);
      return data;
    },
  });
  return (
    <div>
      {!isLoading && (
        <div className="flex space-x-2">
          <div className="flex space-x-1 items-center">
            <PiShootingStarDuotone className="w-6 h-6" />
            <p className="font-semibold text-md">
              {calculateAvgRating(reviews ?? [])}
              {' ('}
              {(reviews ?? []).length}
              {')'}
            </p>
          </div>
          <p className="font-semibold text-lg text-slate-300 dark:text-gray-800">
            |
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseRating;
