'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import TooltipComponent from '../ui/TooltipComponent';
import { FcGoodDecision, FcInvite } from 'react-icons/fc';
import { Button } from '../ui/Button';
import { useAppSelector } from '@/redux/store';
import { mainEndPoint, nextApiEndPoint } from '@/utils/apiEndpoints';
import axios from 'axios';
import { Label } from '../ui/Label';
import Paragraph from '../ui/Paragraph';
import CopyToClipboardComp from '../ui/CopyToClipboard.Comp';
import ShareOnSocialsComp from './ShareOnSocials.Comp';
import { Input } from '../ui/Input';
import ErrorMessage from '../ui/ErrorMessage';

const CourseInvitationDialog = ({
  courseSlug,
  banner,
  courseId,
  courseTitle,
}: {
  courseSlug: string;
  banner: string;
  courseId: string;
  courseTitle: string;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModifyPanel, setOpenModifyPanel] = useState<boolean>(false);
  const [expiresIn, setExpiresIn] = useState<number>(7);
  const [maxCapacity, setMaxCapacity] = useState<number>(100);

  const [url, setUrl] = useState<string>('');

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const createInvitationLink = async () => {
    if (!signedInUser || isLoading) return;

    setIsLoading(true);
    setUrl('');

    const payload = {
      creator: signedInUser.id,
      courseSlug,
      banner,
      expiresIn,
      maxCapacity,
      courseId,
      courseTitle,
    };

    const { data } = await axios.post(
      `${nextApiEndPoint}/invitationLink`,
      payload
    );

    setUrl(`${mainEndPoint}/i/${data.code}`);

    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <TooltipComponent content="Invite Friends">
          <FcGoodDecision className="w-8 h-8 cursor-pointer" />
        </TooltipComponent>
      </DialogTrigger>
      <DialogContent className="bg-slate-100 dark:bg-gray-950 border border-slate-300 dark:border-gray-800 max-w-xl w-full">
        <FcInvite className="w-16 h-16 mx-auto" />

        {openModifyPanel && (
          <div className="flex space-x-2 justify-center items-center animate-in slide-in-from-bottom-5">
            <Input
              defaultValue={expiresIn}
              type="number"
              onChange={(e) => {
                let value = parseInt(e.target.value) || 1;
                value = Math.min(value, 10);
                setExpiresIn(value);
              }}
            />
            <Input
              defaultValue={maxCapacity}
              type="number"
              onChange={(e) => {
                let value = parseInt(e.target.value) || 1;
                value = Math.min(value, 400);
                setMaxCapacity(value);
              }}
            />
          </div>
        )}

        <p className="text-xs font-semibold">
          The link will expire within{' '}
          <span className="text-rose-500">{expiresIn}</span> Days and can invite
          upto <span className="text-rose-500">{maxCapacity}</span> users{' '}
          <span
            className="text-rose-500 cursor-pointer underline"
            onClick={() => setOpenModifyPanel(!openModifyPanel)}
          >
            {openModifyPanel ? 'Done?' : 'Change'}
          </span>
        </p>

        <Button
          className="w-full focus:ring-0"
          isLoading={isLoading}
          onClick={createInvitationLink}
        >
          Generate {url !== '' && 'another'} Invitation Link
        </Button>

        {url !== '' && (
          <React.Fragment>
            <Label>Copy Invitation Link</Label>
            <div className="flex items-center justify-center w-full border-2 border-gray-950 dark:border-slate-100 rounded mb-2 p-2">
              <Paragraph className="text-start font-semibold text-lg truncate-text-1-line">
                {url}
              </Paragraph>
              <CopyToClipboardComp url={url} />
            </div>
            <ShareOnSocialsComp url={url} />
          </React.Fragment>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CourseInvitationDialog;
