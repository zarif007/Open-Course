import { IEmbedContent } from '@/types/courseTopic';
import React, { useState, useRef } from 'react';
import CourseEmbedRawUrl from './CourseEmbedRawUrl';
import { FiLink } from 'react-icons/fi';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';
import IFrame from './IFrame';

// Extend HTMLElement with vendor-prefixed fullscreen methods
interface FullscreenHTMLElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

// Extend Document with vendor-prefixed fullscreen elements and exit methods
interface FullscreenDocument extends Document {
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
  webkitFullscreenElement?: Element;
  msFullscreenElement?: Element;
}

const CourseEmbedLinkDisplay = ({ content }: { content: IEmbedContent }) => {
  const [showUrl, setShowUrl] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const contentUrl = content.url;

  const handleFullscreen = async () => {
    const el = containerRef.current as FullscreenHTMLElement | null;
    const doc = document as FullscreenDocument;

    if (!el) return;

    try {
      if (!isFullscreen) {
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
          await el.msRequestFullscreen();
        }
      } else {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  React.useEffect(() => {
    const doc = document as FullscreenDocument;

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'MSFullscreenChange',
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`mx-auto w-full ${
        isFullscreen ? 'h-screen bg-black' : 'h-[45vh] md:h-[80vh]'
      }`}
      id="main"
    >
      <div
        className={`flex items-center justify-end space-x-8 ${
          isFullscreen ? 'p-4' : ''
        }`}
      >
        <div onClick={() => setShowUrl(!showUrl)}>
          {!showUrl ? (
            <div className="flex space-x-1 items-center cursor-pointer text-white">
              <FiLink />
              <p>Link</p>
            </div>
          ) : (
            <div className="flex space-x-1 items-center cursor-pointer text-white">
              <MdOutlineVideoLibrary />
              <p>Content</p>
            </div>
          )}
        </div>
        <div
          onClick={handleFullscreen}
          className="flex space-x-1 items-center cursor-pointer text-white"
        >
          {isFullscreen ? <BiExitFullscreen /> : <BiFullscreen />}
          <p>{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</p>
        </div>
      </div>
      <div className={isFullscreen ? 'h-[calc(100vh-4rem)]' : 'h-full'}>
        {!showUrl ? (
          <IFrame contentUrl={contentUrl} />
        ) : (
          <CourseEmbedRawUrl url={contentUrl} />
        )}
      </div>
    </div>
  );
};

export default CourseEmbedLinkDisplay;
