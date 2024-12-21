import { IEmbedContent } from '@/types/courseTopic';
import React, { useState } from 'react';
import CourseEmbedLinkFullscreenDialog from './CourseEmbedLinkFullscreen.Dialog';
import CourseEmbedRawUrl from './CourseEmbedRawUrl';
import { FiLink } from 'react-icons/fi';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { BiFullscreen } from 'react-icons/bi';
import IFrame from './IFrame';

const CourseEmbedLinkDisplay = ({ content }: { content: IEmbedContent }) => {
  const [showUrl, setShowUrl] = useState<boolean>(false);

  const contentUrl = content.url;

  return (
    <div className={`mx-auto w-[100%] h-[45vh] md:h-[80vh]`} id="main">
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
        <CourseEmbedLinkFullscreenDialog url={contentUrl}>
          <div className="flex space-x-1 items-center">
            <BiFullscreen />
            <p>Full Screen</p>
          </div>
        </CourseEmbedLinkFullscreenDialog>
      </div>
      {!showUrl ? (
        <IFrame contentUrl={contentUrl} />
      ) : (
        <CourseEmbedRawUrl url={contentUrl} />
      )}
    </div>
  );
};

export default CourseEmbedLinkDisplay;
