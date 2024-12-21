import React, { useEffect, useState } from 'react';
import CourseEmbedRawUrl from './CourseEmbedRawUrl';
import createEmbeddableUrls from '@/utils/getEmbedableUrl';

const IFrame = ({ contentUrl }: { contentUrl: string }) => {
  const [isEmbeddable, setIsEmbeddable] = useState<boolean>(true);

  useEffect(() => {
    const isUrlEmbeddable = async (url: string) => {
      try {
        const response = await fetch('/api/check-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });
        const isEmbeddable = (await response.json()).isEmbeddable;
        setIsEmbeddable(isEmbeddable);
      } catch (error) {
        setIsEmbeddable(false);
      }
    };
    isUrlEmbeddable(contentUrl);
  }, [contentUrl]);
  return (
    <div className="h-full">
      {isEmbeddable ? (
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

export default IFrame;
