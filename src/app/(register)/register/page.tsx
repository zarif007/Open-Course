'use client';

import CommonComps from '@/components/auth/Auth.Form';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Register = () => {
  const router = useRouter();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  useEffect(() => {
    if (signedInUser?.id) {
      router.push('/');
    }
  }, [signedInUser]);

  return (
    <div className="w-full h-screen mx-auto my-auto">
      <CommonComps type="signUp" />
    </div>
  );
};

export default Register;
