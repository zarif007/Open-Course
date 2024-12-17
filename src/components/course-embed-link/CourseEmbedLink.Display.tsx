import { IEmbedContent } from '@/types/courseTopic';
import React, { useState, useEffect } from 'react';
import createEmbeddableUrls from '@/utils/getEmbedableUrl';
import CourseEmbedLinkFullscreenDialog from './CourseEmbedLinkFullscreen.Dialog';
import CourseEmbedRawUrl from './CourseEmbedRawUrl';
import { FiLink } from 'react-icons/fi';
import { MdOutlineVideoLibrary } from 'react-icons/md';

const CourseEmbedLinkDisplay = ({ content }: { content: IEmbedContent }) => {
  const [showUrl, setShowUrl] = useState<boolean>(false);
  const [isEmbedable, setEmbedable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const contentUrl = content.url;

  useEffect(() => {
    setEmbedable(true);
    setIsLoading(true);
  }, [contentUrl]);

  const handleIframeLoad = (e: React.SyntheticEvent) => {
    setIsLoading(false);

    try {
      const frame = e.target as HTMLIFrameElement;
      if (!frame || !frame.contentWindow) {
        throw new Error('Frame access denied');
      }

      setEmbedable(true);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'SecurityError') {
        setEmbedable(false);
      }
      console.log('Embedding check error:', err);
    }
  };

  const handleIframeError = () => {
    console.log('Iframe failed to load');
    setIsLoading(false);
    setEmbedable(false);
  };

  const toggleView = () => setShowUrl(!showUrl);

  const renderControls = () => (
    <div className="flex items-center justify-end space-x-8 mb-4">
      <div onClick={toggleView} className="cursor-pointer">
        {!showUrl ? (
          <div className="flex space-x-1 items-center hover:text-rose-500">
            <FiLink />
            <p>Link</p>
          </div>
        ) : (
          <div className="flex space-x-1 items-center hover:text-rose-500">
            <MdOutlineVideoLibrary />
            <p>Content</p>
          </div>
        )}
      </div>
      <CourseEmbedLinkFullscreenDialog url={contentUrl} />
    </div>
  );

  return (
    <div
      className={`mx-auto w-full ${isEmbedable ? 'h-[45vh] md:h-[80vh]' : ''}`}
      id="main"
    >
      {isEmbedable && renderControls()}

      {!showUrl && isEmbedable ? (
        <>
          {isLoading && (
            <div className="w-full h-64 flex items-center justify-center bg-gray-100">
              <div className="text-gray-600">Loading content...</div>
            </div>
          )}
          <iframe
            src={createEmbeddableUrls(contentUrl)}
            id="iframe"
            style={{ display: isLoading ? 'none' : 'block' }}
            className="border-2 border-rose-500 rounded w-full h-full"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            title="Embedded Website"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </>
      ) : (
        <CourseEmbedRawUrl url={contentUrl} />
      )}
    </div>
  );
};

export default CourseEmbedLinkDisplay;
