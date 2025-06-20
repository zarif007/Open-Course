import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/redux/store';
import { IEnrollState } from '@/types/enrollState';
import { ICourse } from '@/types/course';
import axios from 'axios';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import { toast } from '@/components/ui/Toast';

export const useEnrollment = (
  course: ICourse,
  enrollState: IEnrollState | null
) => {
  const router = useRouter();

  const [loadingStatus, setLoadingStatus] = useState<
    'free' | 'Processing' | 'Redirecting'
  >('free');

  const [isEnrolled, setIsEnrolled] = useState<string>('loading');

  const { data: session } = useSession();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  useEffect(() => {
    if (!signedInUser?.id || !enrollState) {
      setIsEnrolled('no');
    } else {
      setIsEnrolled('yes');
    }
  }, [course, signedInUser?.id, enrollState]);

  const handleEnrollment = async () => {
    if (loadingStatus !== 'free' || !signedInUser?.id) return;

    setLoadingStatus('Processing');

    try {
      const data = {
        course: course.id,
        user: signedInUser?.id,
      };

      await axios.post(`${nextApiEndPoint}/enrollState`, data);

      router.push(`/course/${course.slug}?topicId=1`);
      setLoadingStatus('Redirecting');
      toast({
        title: 'Course Enrolled',
        type: 'success',
        message: `${course.title} Enrolled Successfully`,
      });
    } catch (error) {
      toast({
        title: 'error',
        type: 'error',
        message: `Try again later`,
      });
      setLoadingStatus('free');
    }
  };

  const navigateToCourse = (topicId?: number) => {
    setLoadingStatus('Redirecting');
    const url = topicId
      ? `/course/${course.slug}?topicId=${topicId}`
      : `/course/${course.slug}`;
    router.push(url);
  };

  return {
    loadingStatus,
    isEnrolled,
    session,
    signedInUser,
    handleEnrollment,
    navigateToCourse,
    setLoadingStatus,
  };
};
