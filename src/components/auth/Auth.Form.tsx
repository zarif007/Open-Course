import React, { useState } from 'react';
import GalaxyBg from '../ui/ThreeD/GalaxyBg';
import OAuthProviders from './OAuthProviders';
import { Button } from '../ui/Button';
import { MdOutlineMailLock } from 'react-icons/md';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

const AuthForm = ({
  type,
  isModal,
}: {
  type: 'signIn' | 'signUp';
  isModal: boolean;
}) => {
  const [showEmailPasswordPortal, setShowEmailPasswordPortal] =
    useState<boolean>(false);

  const header = type === 'signIn' ? 'Sign In' : 'Sign Up';

  const Form = () => {
    return (
      <div
        className="mx-auto w-96 p-4 backdrop-blur-sm rounded mb-2 animate-in slide-in-from-top duration-300"
        key={type === 'signIn' ? 0 : 1}
      >
        {!showEmailPasswordPortal ? (
          <div className="flex flex-col">
            <p className="text-2xl mb-4 underline decoration-rose-500 decoration-4 font-bold text-center">
              {header} With Social
            </p>
            <OAuthProviders />
            <div className="w-full flex items-center justify-center mx-auto my-2 space-x-3">
              <div
                className="w-full"
                style={{
                  borderTop: '2px dashed #f43f5e',
                }}
              />
              <p className="text-sm font-bold">Or</p>
              <div
                className="w-full"
                style={{
                  borderTop: '2px dashed #f43f5e',
                }}
              />
            </div>
            <Button
              className="w-full py-6 flex space-x-2 justify-center items-center focus:ring-0"
              onClick={() => setShowEmailPasswordPortal(true)}
            >
              <MdOutlineMailLock className="w-7 h-7" />
              <p className="font-bold text-lg">Email & Password</p>
            </Button>
            <div className="mt-2 text-right">
              <Link
                href={type === 'signIn' ? '/register' : '/login'}
                className="font-bold text-sm underline decoration-rose-500 decoration-4"
              >
                {type === 'signIn' ? 'Create' : 'Have'} an Account?
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full overflow-x-hidden">
            <div
              className="flex justify-end m-2 cursor-pointer"
              onClick={() => setShowEmailPasswordPortal(false)}
            >
              <FaArrowLeft className="h-6 w-6" />
            </div>
            <p className="text-2xl mb-4 underline decoration-rose-500 decoration-4 font-bold text-center">
              {header} With Cred
            </p>
            {type === 'signIn' ? <LoginForm /> : <RegistrationForm />}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {isModal ? (
        <Form />
      ) : (
        <GalaxyBg>
          <Form />
        </GalaxyBg>
      )}
    </div>
  );
};

export default AuthForm;
