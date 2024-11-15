import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import AuthForm from './Auth.Form';
import { Button } from '../ui/Button';

const AuthDialog = ({
  children,
  manualCallbackUrl,
}: {
  children: React.ReactNode;
  manualCallbackUrl: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="flex space-x-1 items-center w-full">
        {children}
      </DialogTrigger>
      <DialogContent className="mx-auto p-0 border-2 border-rose-500 dark:bg-[#0a0a0a] bg-slate-200">
        <div className="w-full">
          <AuthForm
            type="signIn"
            isModal={true}
            manualCallbackUrl={manualCallbackUrl}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
