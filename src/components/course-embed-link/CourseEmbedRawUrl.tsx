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
      <div className="flex space-x-2 items-center justify-center flex-1 min-w-0 mr-4">
        <img className="h-12 w-12 rounded-md flex-shrink-0" src={favIconUrl} />
        <Paragraph className="font-semibold text-xl break-all overflow-wrap-anywhere min-w-0 flex-1">
          {url}
        </Paragraph>
      </div>
      <div className="flex space-x-2 items-center flex-shrink-0">
        <CopyToClipboardComp url={url} />
        <Link href={url} target="_blank">
          <GoProjectSymlink className="h-7 w-7 cursor-pointer text-gray-950 dark:text-slate-100" />
        </Link>
      </div>
    </div>
  );
};

export default CourseEmbedRawUrl;
