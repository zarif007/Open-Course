import React from 'react';
import VotingHandler from './VotingHandler';
import DOMPurify from 'dompurify';
import { IAskResponse } from '@/types/courseAsk/response';
import { ICourseAsk } from '@/types/courseAsk';

const ContentController = ({
  object,
}: {
  object: ICourseAsk | IAskResponse;
}) => {
  const HTMLText = () => {
    if ((object as ICourseAsk).title !== undefined) {
      return (object as ICourseAsk).question;
    }

    return (object as IAskResponse).answer;
  };

  return (
    <div className="w-full flex items-start space-x-4 px-3 py-4">
      <VotingHandler object={object} />
      <div className="w-11/12 flex flex-col space-y-2">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(HTMLText()),
          }}
        />
      </div>
    </div>
  );
};

export default ContentController;
