'use client';

import React from 'react';
import CourseRatings from './CourseRatings';
import CourseReviews from './CourseReviews';
import { useQuery } from '@tanstack/react-query';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import { Skeleton } from '../ui/Skeleton';

const CourseFeedbacks = ({ courseId }: { courseId: string }) => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: [`course-feedback-${courseId}`],
    enabled: !!courseId,
    queryFn: async () => {
      const { data } = await (
        await fetch(`${nextApiEndPoint}/courseReview/${courseId}`)
      ).json();

      return data;
    },
  });

  return (
    <div>
      {isLoading ? (
        <div className="mx-auto">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Skeleton
              key={index}
              className="mx-auto my-2 h-5 w-[80%] md:w-[50%]"
            />
          ))}
        </div>
      ) : (
        <div>
          <CourseRatings reviews={reviews ?? []} />
          <CourseReviews reviews={reviews ?? []} />
        </div>
      )}
    </div>
  );
};

export default CourseFeedbacks;
