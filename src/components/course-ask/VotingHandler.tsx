'use client';

import React, { useState } from 'react';
import { BiSolidDownvote, BiSolidUpvote } from 'react-icons/bi';
import TooltipComponent from '../ui/TooltipComponent';
import { ICourseAsk } from '@/types/courseAsk';
import { useAppSelector } from '@/redux/store';
import { trpc } from '@/app/_trpc/client';
import { toast } from '../ui/Toast';
import { IUser } from '@/types/user';
import { IAskResponse } from '@/types/courseAsk/response';

const VotingHandler = ({ object }: { object: ICourseAsk | IAskResponse }) => {
  const updateAsk = trpc.updateCourseAsks.useMutation();
  const updateResponse = trpc.updateAskResponse.useMutation();

  const [votes, setVotes] = useState<{ upVote: string[]; downVote: string[] }>({
    upVote: object.upVote as string[],
    downVote: object.downVote as string[],
  });

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const handleVoting = async (type: 'up' | 'down') => {
    if (!signedInUser?.id) return;

    let updated = votes;
    if (type === 'up') {
      if (!updated.upVote.includes(signedInUser.id)) {
        updated = {
          upVote: [...updated.upVote, signedInUser.id],
          downVote: updated.downVote.filter((x) => x != signedInUser.id),
        };
      } else {
        updated = {
          upVote: updated.upVote.filter((x) => x != signedInUser.id),
          downVote: updated.downVote,
        };
      }
    } else if (type === 'down') {
      if (!updated.downVote.includes(signedInUser.id)) {
        updated = {
          downVote: [...updated.downVote, signedInUser.id],
          upVote: updated.upVote.filter((x) => x != signedInUser.id),
        };
      } else {
        updated = {
          downVote: updated.downVote.filter((x) => x != signedInUser.id),
          upVote: updated.upVote,
        };
      }
    }

    // For Optimistic Update
    setVotes(updated);

    const author = object.author as IUser;
    const updatedObject = {
      ...object,
      author: author.id,
      upVote: updated.upVote,
      downVote: updated.downVote,
    };

    try {
      if ((object as ICourseAsk).title)
        await updateAsk.mutateAsync(updatedObject);
      else await updateResponse.mutateAsync(updatedObject);
    } catch {
      toast({
        title: 'Something went wrong',
        type: 'error',
        message: 'please Try again later',
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center px-2 w-1/12">
      <TooltipComponent content="Up Vote">
        <BiSolidUpvote
          onClick={() => handleVoting('up')}
          className={`w-8 h-8 cursor-pointer hover:text-green-500 ${
            votes.upVote.includes(signedInUser?.id ?? '') && 'text-green-500'
          }`}
        />
      </TooltipComponent>
      <p className="font-semibold text-lg">
        {votes.upVote.length - votes.downVote.length}
      </p>
      <TooltipComponent content="Down Vote">
        <BiSolidDownvote
          onClick={() => handleVoting('down')}
          className={`w-8 h-8 cursor-pointer hover:text-red-500 ${
            votes.downVote.includes(signedInUser?.id ?? '') && 'text-red-500'
          }`}
        />
      </TooltipComponent>
    </div>
  );
};

export default VotingHandler;
