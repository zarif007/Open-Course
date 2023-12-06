'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/Dialog';
import TooltipComponent from '../ui/TooltipComponent';
import { FcShare } from 'react-icons/fc';
import { Button } from '../ui/Button';

import { Label } from '../ui/Label';
import Paragraph from '../ui/Paragraph';
import CopyToClipboardComp from '../ui/CopyToClipboard.Comp';
import ShareOnSocialsComp from './ShareOnSocials.Comp';

const CourseShareDialog = ({ url }: { url: string }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <TooltipComponent content="Share with people">
          <FcShare className="w-8 h-8 cursor-pointer" />
        </TooltipComponent>
      </DialogTrigger>
      <DialogContent className="bg-slate-100 dark:bg-gray-950 border border-slate-300 dark:border-gray-800 max-w-2xl w-full">
        <ShareOnSocialsComp url={url} />
        <Label>Copy URL</Label>
        <div className="flex items-center justify-center w-full border-2 border-gray-950 dark:border-slate-100 rounded mb-2 p-2">
          <Paragraph className="text-start font-semibold text-lg truncate-text-1-line">
            {url}
          </Paragraph>
          <CopyToClipboardComp url={url} />
        </div>
        <DialogClose>
          <Button className="w-full">Done?</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CourseShareDialog;
