import React from 'react';
import Paragraph from '../ui/Paragraph';
import { IAskResponse } from '@/types/courseAsk/response';
import ContentController from './Content.Controller';

const AskResponses = ({ responses }: { responses: IAskResponse[] }) => {
  return (
    <div>
      <Paragraph className="text-start font-bold text-md">
        {responses.length} Answers
      </Paragraph>
      {responses.map((response) => (
        <div
          key={response.id}
          className="rounded px-2 border border-gray-300 dark:border-gray-800 my-2"
        >
          <ContentController object={response} />
        </div>
      ))}
    </div>
  );
};

export default AskResponses;
