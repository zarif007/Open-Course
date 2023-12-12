'use client';

import React, { useEffect, useState } from 'react';
import { FaReply } from 'react-icons/fa6';
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai';
import { IDiscussion } from '@/types/discussion';
import { IUser } from '@/types/user';
import EmojiPickerDialog from '../ui/EmojiPicker.Dialog';
import { useSession } from 'next-auth/react';

const DiscussDropdown = ({
  discussion,
  handleDelete,
  setEditingStatus,
  handleAddEmoji,
  setOpenReplyPanel,
  openReplyPanel,
}: {
  discussion: IDiscussion;
  handleDelete: () => Promise<void>;
  setEditingStatus: React.Dispatch<
    React.SetStateAction<'no' | 'editing' | 'processing'>
  >;
  handleAddEmoji: (emoji: string) => void;
  setOpenReplyPanel: React.Dispatch<React.SetStateAction<boolean>>;
  openReplyPanel: boolean;
}) => {
  const [accessStatus, setAccessStatus] = useState<
    'unauthorized' | 'can-interact' | 'can-modify'
  >('unauthorized');

  const { data: session } = useSession();

  const styles = {
    icon: `h-5 w-5 cursor-pointer`,
  };

  useEffect(() => {
    if (session?.user) {
      const sender = discussion.sender as IUser;
      if (session?.user?.email === sender.email) setAccessStatus('can-modify');
      else setAccessStatus('can-interact');
    }
  }, [session?.user]);

  return (
    <div className="flex space-x-2">
      {accessStatus !== 'unauthorized' && (
        <div
          className={`rounded bg-slate-300 dark:bg-gray-900 px-2 py-2 flex space-x-3 w-fit`}
        >
          <EmojiPickerDialog handleAddEmoji={handleAddEmoji} />
          <FaReply
            className={styles.icon}
            onClick={() => setOpenReplyPanel(!openReplyPanel)}
          />
          {accessStatus === 'can-modify' && (
            <div className="flex space-x-3 w-fit">
              <AiTwotoneEdit
                className={styles.icon}
                onClick={() => setEditingStatus('editing')}
              />
              <AiTwotoneDelete className={styles.icon} onClick={handleDelete} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscussDropdown;
