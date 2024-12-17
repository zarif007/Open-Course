import { IEmbedContent } from '@/types/courseTopic';
import React, { useState } from 'react';
import createEmbeddableUrls from '@/utils/getEmbedableUrl';
import CourseEmbedLinkFullscreenDialog from './CourseEmbedLinkFullscreen.Dialog';
import CourseEmbedRawUrl from './CourseEmbedRawUrl';
import { FiLink } from 'react-icons/fi';
import { MdOutlineVideoLibrary } from 'react-icons/md';

const CourseEmbedLinkDisplay = ({ content }: { content: IEmbedContent }) => {
  const [showUrl, setShowUrl] = useState<boolean>(false);
  const [isEmbedable, setEmbedable] = useState<boolean>(true);

  const contentUrl = content.url;

  return (
    <div
      className={`mx-auto w-[100%] ${
        isEmbedable ? 'h-[45vh] md:h-[80vh]' : ''
      }`}
      id="main"
    >
      {isEmbedable && (
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
      {!showUrl && isEmbedable ? (
        <iframe
          src={createEmbeddableUrls(contentUrl)}
          id="iframe"
          className="border-[3px] border-rose-500 rounded"
          onLoad={(e) => {
            try {
              const frame = e.target as HTMLIFrameElement;
              frame.contentWindow?.location.href;
            } catch (err) {
              setEmbedable(false);
            }
          }}
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
