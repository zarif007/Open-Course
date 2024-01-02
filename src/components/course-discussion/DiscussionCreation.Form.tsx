'use client';

import { AppDispatch, useAppSelector } from '@/redux/store';
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
import { useDispatch } from 'react-redux';
import { setDiscussions } from '@/redux/features/topic-discuss-slice';
import constructNotification from '@/utils/constructNotification';
import { useSocket } from '@/context/SocketProvider';

const DiscussionCreationForm = ({
  parentId,
  parentAuthor,
  onSubmitFunction,
}: {
  parentId: string;
  parentAuthor: null | string;
  onSubmitFunction: () => void;
}) => {
  const socket = useSocket();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const currentCourse = useAppSelector(
    (state) => state.courseViewReducer.value.course
  );

  const discussions = useAppSelector(
    (state) => state.discussionsReducer.value.discussions
  );

  const version = currentCourseTopic.versions.length - 1;
  const topicId = currentCourseTopic.id as string;

  const dispatch = useDispatch<AppDispatch>();

  const findAndUpdateDiscussion = (
    discussionDocs: (IDiscussion | string)[],
    discussion: IDiscussion
  ): (IDiscussion | string)[] => {
    if (discussionDocs.length === 0) return [];

    let updatedDD: any = discussionDocs.map((dd) => {
      if (typeof dd === 'string') return dd;

      // const objReplies = dd.replies.filter((dp) => typeof dp === 'object');

      if (dd.id === discussion.parentId) {
        return {
          ...dd,
          replies: [discussion, ...dd.replies],
        };
      } else {
        const updatedReplies = findAndUpdateDiscussion(
          dd.replies as (IDiscussion | string)[],
          discussion
        );
        return {
          ...dd,
          replies: updatedReplies,
        };
      }
    });

    return updatedDD;
  };

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

    let discussionDocs: (string | IDiscussion)[] = [...discussions];

    if (response.data.parentId === 'none') {
      discussionDocs = [response.data, ...discussionDocs];
    } else {
      discussionDocs = findAndUpdateDiscussion(
        [...discussionDocs],
        response.data
      );
    }

    // Generating Notification
    if (parentAuthor && parentAuthor !== signedInUser.id && socket) {
      const notification = constructNotification(
        { name: signedInUser.name, image: signedInUser.image },
        parentAuthor,
        `/course/${currentCourse.slug}?topicId=${currentCourseTopic.topicID}&tab=discuss`,
        'Replied'
      );
      socket.postNotification(notification);
    }

    dispatch(setDiscussions(discussionDocs));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-2">
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
