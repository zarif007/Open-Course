import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import createEmbeddableUrls from '@/utils/getEmbedableUrl';

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
        <iframe
          src={createEmbeddableUrls(url)}
          className="border-[3px] border-rose-500 rounded "
          width="100%"
          height="100%"
          title="Embedded Website"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  );
};

export default CourseEmbedLinkFullscreenDialog;
