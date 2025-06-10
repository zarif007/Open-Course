'use client';

import CourseCard from '@/components/course-cards/Course.Card';
import { ICourse } from '@/types/course';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CourseCardSkeleton from '@/components/skeletons/CourseCard.Skeleton';
import useGetInfiniteCourses from '@/hooks/queries/useGetInfiniteCourses';
import CourseSearchDialog from '@/components/course-details/CourseSearch.Dialog';
import { useSearchParams, useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';

const LIMIT = 6;

const Courses = () => {
  const { ref, inView } = useInView();
  const [courses, setCourses] = useState<ICourse[] | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchTerm = searchParams?.get('searchTerm') ?? '';
  const categories = searchParams?.get('categories') ?? '';
  const levels = searchParams?.get('levels') ?? '';
  const languages = searchParams?.get('languages') ?? '';
  const isAIGenerated = searchParams?.get('isAIGenerated') ?? 'false';

  const constructUrl = () => {
    let url = '';
    if (searchTerm !== '') url += `&searchTerm=${searchTerm}`;
    if (categories !== '') url += `&categories=${categories}`;
    if (levels !== '') url += `&levels=${levels}`;
    if (languages !== '') url += `&languages=${languages}`;
    url += `&isAIGenerated=${isAIGenerated}`;
    return url;
  };

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useGetInfiniteCourses(constructUrl());

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('isAIGenerated', value);
    router.push(`/courses?${params.toString()}`);
  };

  useEffect(() => {
    setCourses(null);
    refetch();
  }, [searchParams]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    setCourses(data?.pages.flatMap((page) => page) as ICourse[] | null);
  }, [data]);

  return (
    <div className="md:mx-4">
      <div className="flex flex-row items-center justify-between gap-4 mx-4 mb-4">
        <Tabs
          value={isAIGenerated}
          onValueChange={handleTabChange}
          className="flex-1 min-w-0"
        >
          <TabsList className="h-12 bg-background p-1 rounded-lg border">
            <TabsTrigger
              value="false"
              className="data-[state=active]:shadow-sm h-10 px-3 sm:px-4 py-2 rounded-md transition-all font-semibold"
            >
              <span className="sm:hidden">📚</span>
              <span className="hidden sm:inline">📚 Regular Courses</span>
            </TabsTrigger>
            <TabsTrigger
              value="true"
              className="data-[state=active]:shadow-sm h-10 px-3 sm:px-4 py-2 rounded-md transition-all font-semibold"
            >
              <span className="sm:hidden">🤖</span>
              <span className="hidden sm:inline">🤖 AI-Generated</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex-shrink-0">
          <CourseSearchDialog />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
        {courses?.map((course: ICourse, index: number) => {
          return courses.length === index + 1 ? (
            <div ref={ref} key={course.id}>
              <CourseCard course={course} />
            </div>
          ) : (
            <CourseCard key={course.id} course={course} />
          );
        })}
        {(isFetchingNextPage || !courses) && (
          <React.Fragment>
            {new Array(LIMIT).fill(0).map((_, index) => (
              <div key={index} className="px-3 pb-3">
                <CourseCardSkeleton />
              </div>
            ))}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Courses;
