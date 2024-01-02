/* eslint-disable @next/next/no-img-element */
'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import * as React from 'react';
import hotToast, { Toaster as HotToaster } from 'react-hot-toast';

export const Toaster = HotToaster;

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean;
}

export function Toast({ visible, className, ...props }: ToastProps) {
  return (
    <div
      className={cn(
        'min-h-16 mb-2 flex w-[350px] flex-col items-start gap-1 rounded-md bg-white px-6 py-4 shadow-lg',
        visible && 'animate-in slide-in-from-bottom-5',
        className
      )}
      {...props}
    />
  );
}

interface ToastTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

Toast.Title = function ToastTitle({ className, ...props }: ToastTitleProps) {
  return <p className={cn('text-sm font-medium', className)} {...props} />;
};

interface ToastDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

Toast.Description = function ToastDescription({
  className,
  ...props
}: ToastDescriptionProps) {
  return <p className={cn('text-sm opacity-80', className)} {...props} />;
};

interface ToastOpts {
  title?: string;
  message: string;
  duration?: number;
  link: string;
  image: string;
}

export function notificationToast(opts: ToastOpts) {
  const { title, message, link, image, duration = 3000 } = opts;

  return hotToast.custom(
    ({ visible }) => (
      <Toast
        visible={visible}
        className={cn(
          'bg-slate-100 dark:bg-gray-950 border-2 border-rose-500 text-gray-900 dark:text-white'
        )}
      >
        <Link
          className="flex space-x-3 items-center justify-center"
          href={link}
        >
          <img src={image} className="w-12 h-12 rounded" />
          <div>
            <Toast.Title className="text-semibold">{title}</Toast.Title>
            {message && <Toast.Description>{message}</Toast.Description>}
          </div>
        </Link>
      </Toast>
    ),
    { duration }
  );
}
