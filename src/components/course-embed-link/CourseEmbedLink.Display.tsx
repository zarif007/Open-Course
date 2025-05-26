/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEmbedContent } from '@/types/courseTopic';
import React, { useState, useRef } from 'react';
import CourseEmbedRawUrl from './CourseEmbedRawUrl';
import { FiLink } from 'react-icons/fi';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';
import IFrame from './IFrame';

const CourseEmbedLinkDisplay = ({ content }: { content: IEmbedContent }) => {
  const [showUrl, setShowUrl] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const contentUrl = content.url;

  const handleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if ((containerRef.current as any).webkitRequestFullscreen) {
          await (containerRef.current as any).webkitRequestFullscreen();
        } else if ((containerRef.current as any).msRequestFullscreen) {
          await (containerRef.current as any).msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  // Listen for fullscreen changes
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'msfullscreenchange',
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`mx-auto w-[100%] ${
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
