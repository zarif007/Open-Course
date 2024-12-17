import React, { useMemo } from 'react';
import Paragraph from '../ui/Paragraph';
import { GoProjectSymlink } from 'react-icons/go';
import Link from 'next/link';
import CopyToClipboardComp from '../ui/CopyToClipboard.Comp';
import { getFavicon } from '@/utils/getFavicon';

const CourseEmbedRawUrl = ({ url }: { url: string }) => {
  const favIconUrl = useMemo(() => getFavicon(url), [url]);
  return (
    <div className="w-full max-w-3xl mx-auto mt-24 px-6 py-4 flex justify-between items-center my-auto bg-slate-300 dark:bg-gray-800 rounded">
      <div className="flex space-x-2 items-center justify-center">
        <img className="h-12 w-12 rounded-md" src={favIconUrl} />
        <Paragraph className="font-semibold text-xl truncate-text-1-line">
          {url}
        </Paragraph>
      </div>
      <div className="flex space-x-2 items-center">
        <CopyToClipboardComp url={url} />
        <Link href={url} target="_blank">
          <GoProjectSymlink className="h-7 w-7 cursor-pointer text-gray-950 dark:text-slate-100" />
        </Link>
      </div>
    </div>
  );
};

export default CourseEmbedRawUrl;
