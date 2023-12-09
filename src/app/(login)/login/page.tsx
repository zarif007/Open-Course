'use client';

import AuthForm from '@/components/auth/Auth.Form';
import { useAppSelector } from '@/redux/store';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Login = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const callbackUrl = searchParams?.get('callbackUrl') ?? '';

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  useEffect(() => {
    if (signedInUser?.id) {
      router.push('/' + callbackUrl);
    }
  }, [signedInUser]);

  return (
    <div className="w-full h-screen mx-auto my-auto">
      <AuthForm type="signIn" isModal={false} />
    </div>
  );
};

export default Login;
