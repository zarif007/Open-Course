'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/Dialog';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import { toast } from '../ui/Toast';
import { MdOutlineDeleteForever } from 'react-icons/md';

const CourseDeleteDialog = ({ courseId }: { courseId: string }) => {
  const router = useRouter();

  const [loadingStatus, setLoadingStatus] = useState<
    'free' | 'loading' | 'done'
  >('free');

  const errorToast = (errMsg: string) => {
    toast({
      title: 'Error',
      type: 'error',
      message: errMsg,
    });
    setLoadingStatus('free');
  };

  const deleteCourse = async () => {
    if (loadingStatus !== 'free') return;
    setLoadingStatus('loading');
    try {
      const { data } = await axios.delete(
        `${nextApiEndPoint}/course/${courseId}`
      );
      if (!data.success) {
        errorToast(data.message);
        return;
      }
      router.push('/');
      toast({
        title: 'Deleted',
        type: 'success',
        message: 'Course deleted successfully',
      });
      setLoadingStatus('done');
    } catch {
      errorToast('something went wrong');
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="flex space-x-1 items-center w-full">
        <MdOutlineDeleteForever className="w-8 h-8 cursor-pointer text-red-500" />
      </DialogTrigger>
      <DialogContent className="mx-auto p-0 border-2 border-rose-500 dark:bg-gray-950 bg-slate-200">
        <div className="w-full p-4 flex flex-col items-center justify-center">
          <MdOutlineDeleteForever className="w-16 h-16 cursor-pointer mt-2 text-red-500" />
          <p className="font-semibold text-md text-center w-full mb-6">
            Are you sure to delete this course?
          </p>
          {loadingStatus !== 'done' ? (
            <div className="flex space-x-2">
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={deleteCourse}
                isLoading={loadingStatus === 'loading'}
              >
                Delete
              </Button>
            </div>
          ) : (
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDeleteDialog;
