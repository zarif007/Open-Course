import { IEmbedContent } from '@/types/courseTopic';
import React, { useMemo, useState } from 'react';
import createEmbeddableUrls from '@/utils/getEmbedableUrl';
import CourseEmbedLinkFullscreenDialog from './CourseEmbedLinkFullscreen.Dialog';
import CourseEmbedRawUrl from './CourseEmbedRawUrl';
import { FiLink } from 'react-icons/fi';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { unEmbedAbleLinks } from '@/constants/unEmbedableLinks';

const CourseEmbedLinkDisplay = ({ content }: { content: IEmbedContent }) => {
  const [showUrl, setShowUrl] = useState<boolean>(false);

  const contentUrl = content.url;

  const checkIfEmbedable = useMemo(() => {
    return !unEmbedAbleLinks.some((link) => contentUrl.includes(link));
  }, [contentUrl]);

  return (
    <div
      className={`mx-auto w-[100%] ${
        checkIfEmbedable ? 'h-[45vh] md:h-[80vh]' : ''
      }`}
      id="main"
    >
      {checkIfEmbedable && (
        <div className="flex items-center justify-end space-x-8">
          <div onClick={() => setShowUrl(!showUrl)}>
            {!showUrl ? (
              <div className="flex space-x-1 items-center cursor-pointer">
                <FiLink />
                <p>Link</p>
              </div>
            ) : (
              <div className="flex space-x-1 items-center cursor-pointer">
                <MdOutlineVideoLibrary />
                <p>Content</p>
              </div>
            )}
          </div>
          <CourseEmbedLinkFullscreenDialog url={contentUrl} />
        </div>
      )}
      {!showUrl && checkIfEmbedable ? (
        <iframe
          src={createEmbeddableUrls(contentUrl)}
          id="iframe"
          className="border-[3px] border-rose-500 rounded"
          width="100%"
          height="100%"
          title="Embedded Website"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <CourseEmbedRawUrl url={contentUrl} />
      )}
    </div>
  );
};

export default CourseEmbedLinkDisplay;
