import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import createEmbeddableUrls from '@/utils/getEmbedableUrl';
import IFrame from './IFrame';

const CourseEmbedLinkFullscreenDialog = ({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="bg-slate-100 dark:bg-[#0a0a0a] border-slate-300 dark:border-gray-800 max-w-7xl w-full h-[98vh] p-0 py-12">
        <IFrame contentUrl={url} />
      </DialogContent>
    </Dialog>
  );
};

export default CourseEmbedLinkFullscreenDialog;
