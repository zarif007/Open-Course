'use client';

import React, { useState, useEffect } from 'react';
import { AppDispatch, useAppSelector } from '@/redux/store';
import axios from 'axios';
import { toast } from '@/components/ui/Toast';
import { useRouter } from 'next/navigation';
import { ICourse } from '@/types/course';
import createSlug from '@/utils/createSlug';
import { ICourseTopic } from '@/types/courseTopic';
import generateBannerFromCourse from '@/utils/generateBannerFromCourse';
import CourseCreationUpdate from '@/components/course-details/Course.CreationUpdate';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { setCourseForUpdate } from '@/redux/features/course-update-slice';
import CourseUpdatePageSkeleton from '@/components/skeletons/CourseUpdatePage.Skeleton';

const MODE = 'edit';

interface PageParams {
  params: {
    slug: string;
  };
}

const CourseUpdate = ({ params }: PageParams) => {
  const [loadingStatus, setLoadingStatus] = useState<
    'free' | 'Processing' | 'Redirecting'
  >('free');

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const course = useAppSelector(
    (state) => state.courseUpdateReducer.value.course
  );

  const { isLoading, isFetching } = useQuery({
    queryKey: [`course-${params.slug}`],
    enabled: !!signedInUser?.id,
    queryFn: async () => {
      const { data } = await (
        await fetch(`${nextApiEndPoint}/course/bySlug/${params.slug}`)
      ).json();

      if (data.creator.id !== signedInUser?.id) {
        router.push('/');
      } else {
        dispatch(setCourseForUpdate(data));
      }

      return data;
    },
    staleTime: 1000 * 60 * 20, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 10 minutes
    keepPreviousData: true,
  });

  const errorToast = (errMsg: string) => {
    setLoadingStatus('free');
    toast({
      title: 'Error',
      type: 'error',
      message: errMsg,
    });
  };

  const validateCourseDetails = (): boolean => {
    const courseTopics = course.topics as ICourseTopic[];
    if (!course.title) {
      errorToast('Title is required');
      return false;
    }
    if (course.categories.length === 0) {
      errorToast('Must add at least one Category');
      return false;
    }
    if (course.levels.length === 0) {
      errorToast('Must add at least one Level');
      return false;
    }
    if (course.languages.length === 0) {
      errorToast('Must add at least one Languages');
      return false;
    }
    if (courseTopics.filter((topic) => topic.id !== 0).length === 0) {
      errorToast('Must add at least one Course Topic');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (loadingStatus !== 'free' || !signedInUser?.id || isLoading) return;

    if (!validateCourseDetails()) return;

    setLoadingStatus('Processing');

    const courseTopics = course.topics as ICourseTopic[];

    const courseData: ICourse = {
      ...course,
      slug: course.slug ? course.slug : createSlug(course.title),
      topics: courseTopics.filter((topic) => topic.id !== 0),
      creator: signedInUser.id,
      banner:
        course.banner === ''
          ? generateBannerFromCourse(course, signedInUser.name)
          : course.banner,
    };

    try {
      const { data } = await axios.put(
        `${nextApiEndPoint}/course/${course.id}`,
        courseData
      );
      if (!data.success) {
        errorToast(data.message);
        return;
      }
      toast({
        title: 'Course Updated',
        type: 'success',
        message: 'Course Updated Successfully',
      });
      setLoadingStatus('Redirecting');

      router.push(`/course-landing/${data.data.slug}`);
    } catch {
      errorToast('Something went wrong, Try again later');
    }
  };

  return (
    <div>
      {isLoading || isFetching ? (
        <CourseUpdatePageSkeleton />
      ) : (
        <CourseCreationUpdate
          MODE={MODE}
          loadingStatus={loadingStatus}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CourseUpdate;
