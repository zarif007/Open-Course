'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import axios from 'axios';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import { toast } from '../ui/Toast';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useAppSelector } from '@/redux/store';
import { ICourse } from '@/types/course';
import { IEnrollState } from '@/types/enrollState';
import AuthDialog from '../auth/Auth.Dialog';

const CourseEnrollmentButton = ({
  course,
  enrollState,
}: {
  course: ICourse;
  enrollState: IEnrollState | null;
}) => {
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

      // window.location.reload();
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

  const handleBackToCourse = () => {
    router.push(`/course/${course.slug}`);
    setLoadingStatus('Redirecting');
  };

  const buttonText =
    loadingStatus === 'free'
      ? isEnrolled === 'yes'
        ? 'Back to Course'
        : 'Enroll'
      : loadingStatus;

  return (
    <div>
      {isEnrolled !== 'loading' && (
        <div className="fixed bottom-0 w-full max-w-5xl mx-auto">
          <div className="m-4 md:mx-6 mt-8">
            {!session?.user ? (
              <div className="w-full">
                <AuthDialog
                  manualCallbackUrl={`/course-landing/${course.slug}`}
                >
                  <Button
                    className="w-full py-6 text-lg font-bold"
                    isLoading={loadingStatus !== 'free'}
                  >
                    Enroll
                  </Button>
                </AuthDialog>
              </div>
            ) : (
              <Button
                className="w-full py-6 text-lg font-bold"
                isLoading={loadingStatus !== 'free'}
                onClick={() =>
                  isEnrolled === 'yes'
                    ? handleBackToCourse()
                    : handleEnrollment()
                }
              >
                {buttonText}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseEnrollmentButton;
