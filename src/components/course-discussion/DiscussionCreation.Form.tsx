'use client';

import { useAppSelector } from '@/redux/store';
import { IDiscussion } from '@/types/discussion';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import { commentCreationSchema } from '@/validations/discussion';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Textarea } from '../ui/Textarea';
import ErrorMessage from '../ui/ErrorMessage';
import { BsEmojiLaughing } from 'react-icons/bs';
import { Button } from '../ui/Button';
import { toast } from '../ui/Toast';

const DiscussionCreationForm = ({
  parentId,
  onSubmitFunction,
}: {
  parentId: string;
  onSubmitFunction: () => void;
}) => {
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const version = currentCourseTopic.versions.length - 1;
  const topicId = currentCourseTopic.id as string;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    comment: string;
  }>({ resolver: zodResolver(commentCreationSchema) });

  const onSubmit = async (data: { comment: string }) => {
    if (!signedInUser || !topicId || version === undefined) return;

    const payload: Partial<IDiscussion> = {
      sender: signedInUser?._id!,
      topicId: topicId,
      version,
      parentId,
      comment: data.comment,
    };

    onSubmitFunction();
    reset();

    const { data: response } = await axios.post(
      `${nextApiEndPoint}/discussion`,
      payload
    );

    if (!response.success) {
      toast({
        title: 'Error',
        type: 'error',
        message: response.message,
      });

      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        {...register('comment')}
        placeholder="Comment"
        className="text-lg mb-4 mt-8 font-semibold"
      />
      <ErrorMessage text={errors.comment?.message} />
      <div className="flex justify-end space-x-3 items-center">
        <BsEmojiLaughing className="h-8 w-8 cursor-pointer" />
        <Button type="submit">Comment</Button>
      </div>
    </form>
  );
};

export default DiscussionCreationForm;
