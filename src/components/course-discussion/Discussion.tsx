/* eslint-disable @next/next/no-img-element */
'use client';

import { IDiscussion } from '@/types/discussion';
import { IUser } from '@/types/user';
import formatDate from '@/utils/formatDate';
import React, { useEffect, useState } from 'react';
import DiscussDropdown from './Discuss.Dropdown';
import axios from 'axios';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import DiscussionEdit from './Discussion.Edit';
import { useAppSelector } from '@/redux/store';
import DiscussionCreationForm from './DiscussionCreation.Form';
import { PiArrowLineDownDuotone } from 'react-icons/pi';
import { FaChevronDown } from 'react-icons/fa6';

const Discussion = ({
  discussion,
  level,
}: {
  discussion: IDiscussion;
  level: number;
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [openReplyPanel, setOpenReplyPanel] = useState<boolean>(false);

  const [showReplies, setShowReplies] = useState<boolean>(true);

  const [editingStatus, setEditingStatus] = useState<
    'no' | 'editing' | 'processing'
  >('no');

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const [currentDiscussion, setCurrentDiscussion] =
    useState<IDiscussion>(discussion);

  useEffect(() => {
    setCurrentDiscussion(discussion);
  }, [discussion]);

  const sender = discussion.sender as IUser;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`${nextApiEndPoint}/discussion/${discussion.id}`);
    } catch (error) {
      throw error;
    }
  };

  const onSubmitFunction = () => {
    setOpenReplyPanel(false);
  };

  const handleAddEmoji = async (emoji: string) => {
    const reactions = discussion.reactions || {};
    const updatedDiscussion: IDiscussion = {
      ...discussion,
      reactions: {
        ...reactions,
        [emoji]: Array.isArray(reactions?.[emoji])
          ? [...reactions[emoji], signedInUser?.id!]
          : [signedInUser?.id!],
      },
    };

    try {
      setCurrentDiscussion(updatedDiscussion);
      await axios.put(
        `${nextApiEndPoint}/discussion/${discussion.id}`,
        updatedDiscussion
      );
    } catch (error) {
      throw error;
    }
  };

  const replies = discussion.replies as IDiscussion[];

  return (
    <div
      key={currentDiscussion.id}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ position: 'relative' }}
      className={`${
        isDeleting && 'opacity-25'
      } w-full animate-in slide-in-from-right duration-300`}
    >
      <div className="my-0 p-3 flex space-x-3 w-full">
        <div className="flex space-x-1 items-center">
          <FaChevronDown
            className={`h-6 w-6 text-slate-300 dark:text-gray-700 cursor-pointer ${
              !showReplies && 'rotate-180'
            }`}
            onClick={() => setShowReplies(!showReplies)}
          />
          <img
            src={sender.image}
            alt="dp"
            className="rounded-full h-10 w-10 "
          />
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <div className="flex items-end space-x-2">
            <p className="text-md font-bold underline decoration-rose-500 decoration-2 truncate">
              {sender.name}
            </p>
            <p className="text-slate-600 dark:text-gray-600 text-sm font-semibold">
              {formatDate(currentDiscussion.updatedAt!)}
            </p>
          </div>
          <div className="w-full">
            {editingStatus !== 'no' ? (
              <DiscussionEdit
                discussion={currentDiscussion}
                editingStatus={editingStatus}
                setEditingStatus={setEditingStatus}
              />
            ) : (
              <p className="text-md font-semibold white-space">
                {currentDiscussion.comment}
              </p>
            )}
          </div>
          <div className="flex space-x-2 flex-wrap">
            {Object.keys(currentDiscussion.reactions || {}).map((key) => (
              <div
                key={key}
                className={`border rounded px-1 cursor-pointer
                  flex space-x-1 items-center justify-center ${
                    currentDiscussion.reactions[key].includes(signedInUser?.id!)
                      ? 'bg-rose-500 bg-opacity-25 border-rose-500'
                      : 'border-slate-300 dark:border-gray-800'
                  }`}
              >
                <p>{key}</p>
                <p className="font-semibold pr-1">
                  {currentDiscussion.reactions[key].length}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reply Creation */}

      <div className="ml-10 my-0">
        {openReplyPanel && (
          <DiscussionCreationForm
            parentId={discussion.id as string}
            onSubmitFunction={onSubmitFunction}
          />
        )}

        {replies.length > 0 && showReplies && (
          <div>
            {replies.map((reply) => {
              return (
                <div key={reply.id}>
                  {typeof reply === 'object' ? (
                    <Discussion discussion={reply} level={level + 1} />
                  ) : (
                    <p>Load more...</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div
        className={`flex justify-end`}
        style={{ position: 'absolute', top: '0', right: '0' }}
      >
        {!isDeleting && isHovering && (
          <DiscussDropdown
            discussion={currentDiscussion}
            handleDelete={handleDelete}
            setEditingStatus={setEditingStatus}
            handleAddEmoji={handleAddEmoji}
            setOpenReplyPanel={setOpenReplyPanel}
            openReplyPanel={openReplyPanel}
          />
        )}
      </div>
    </div>
  );
};

export default Discussion;
