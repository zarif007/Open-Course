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
import { useEnrollment } from '@/hooks/useEnrollment';

const CourseEnrollmentButton = ({
  course,
  enrollState,
}: {
  course: ICourse;
  enrollState: IEnrollState | null;
}) => {
  const {
    loadingStatus,
    isEnrolled,
    session,
    handleEnrollment,
    navigateToCourse,
  } = useEnrollment(course, enrollState);

  const handleBackToCourse = () => {
    navigateToCourse(1);
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
        <div className="fixed bottom-0 w-full max-w-6xl mx-auto">
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
