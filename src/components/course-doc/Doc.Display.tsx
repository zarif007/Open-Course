import { ICourseTopic, IDocContent } from '@/types/courseTopic';
import DOMPurify from 'dompurify';
import React from 'react';

const DocDisplay = ({ content }: { content: IDocContent }) => {
  return (
    <div className="rounded p-3 mx-auto w-full min-h-[45vh] md:min-h-[80vh] border-[3px] border-rose-500 bg-slate-100 dark:bg-[#0a0a0a] overflow-hidden">
      <div
        className="break-normal max-w-full overflow-x-auto"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content.content),
        }}
      />
    </div>
  );
};

export default DocDisplay;
