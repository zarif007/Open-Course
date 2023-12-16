'use client';

import { useAppSelector } from '@/redux/store';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from '../ui/Toast';
import axios from 'axios';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import IInvitationLink from '@/types/invitationLink';
import { Skeleton } from '../ui/Skeleton';
import { Button } from '../ui/Button';

const InvitationHandlerButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const [loadingStatus, setLoadingStatus] = useState<
    'free' | 'Processing' | 'Redirecting'
  >('free');

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const session = useSession();

  const errorOnToast = (message: string) => {
    setLoadingStatus('free');
    toast({
      title: 'Error',
      type: 'error',
      message: message,
    });
  };

  const handleEnrollment = async () => {
    if (loadingStatus !== 'free' || !signedInUser?.id) return;

    setLoadingStatus('Processing');

    try {
      const { data } = await axios.put(
        `${nextApiEndPoint}/invitationLink/${id}`
      );

      if (data.status !== 201) {
        errorOnToast(data.message);
        return;
      }

      const courseInfo: IInvitationLink = data.data;

      const enrollmentInfo = {
        course: courseInfo.courseId,
        user: signedInUser.id,
      };

      await axios.post(`${nextApiEndPoint}/enrollState`, enrollmentInfo);

      router.push(`/course/${courseInfo.courseSlug}`);
      setLoadingStatus('Redirecting');
      toast({
        title: 'Course Enrolled',
        type: 'success',
        message: `${courseInfo.courseTitle} Enrolled Successfully`,
      });
    } catch (error) {
      errorOnToast('Something went wrong, try again later');
    }
  };
  return (
    <div className="w-full">
      {session.status === 'loading' ||
      (session.status === 'authenticated' && !signedInUser) ? (
        <Skeleton className="w-full h-10" />
      ) : (
        <Button
          className="w-full my-1"
          onClick={() => {
            session.status === 'authenticated' ? handleEnrollment() : signIn();
          }}
          isLoading={loadingStatus !== 'free'}
        >
          {loadingStatus === 'free' ? 'Enroll' : loadingStatus}
        </Button>
      )}
    </div>
  );
};

export default InvitationHandlerButton;
