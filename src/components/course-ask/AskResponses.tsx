/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Paragraph from '../ui/Paragraph';
import { IAskResponse } from '@/types/courseAsk/response';
import ContentController from './Content.Controller';
import { IUser } from '@/types/user';
import formatDate from '@/utils/formatDate';

const AskResponses = ({ responses }: { responses: IAskResponse[] }) => {
  return (
    <div>
      <Paragraph className="text-start font-bold text-md">
        {responses.length} Answers
      </Paragraph>
      {responses.map((response) => {
        const author = response.author as IUser;
        return (
          <div key={response.id}>
            <div className="rounded px-2 border border-gray-300 dark:border-gray-800 my-2">
              <ContentController object={response} />
            </div>
            <div className="flex justify-end space-x-2 items-center my-2">
              <img
                src={author.image}
                alt="author"
                className="h-8 w-8 rounded"
              />
              <div className="flex flex-col space-y-1">
                <p className="text-xs font-semibold">{author.name}</p>
                <p className="text-xs font-bold text-slate-400 dark:text-gray-700">
                  {formatDate(response.createdAt ?? '')}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AskResponses;
