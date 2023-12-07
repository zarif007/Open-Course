/* eslint-disable @next/next/no-img-element */
'use client';

import LargeHeading from '@/components/ui/LargeHeading';
import { ICourseAsk } from '@/types/courseAsk';
import { IUser } from '@/types/user';
import formatDate from '@/utils/formatDate';
import React from 'react';
import SelectedTopics from '../course-details/SelectedTopics';
import ContentController from './Content.Controller';

const AskPage = ({ ask }: { ask: ICourseAsk }) => {
  const author = ask.author as IUser;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <LargeHeading
        size="sm"
        className="underline decoration-rose-500 decoration-4 text-start"
      >
        {ask.title}
      </LargeHeading>
      <div className="flex justify-start space-x-2 items-center my-2">
        <img src={author.image} alt="author" className="h-10 w-10 rounded" />
        <div className="flex flex-col space-y-1">
          <p className="text-xs font-semibold">{author.name}</p>
          <div className="flex space-x-2">
            <p className="text-xs font-bold text-slate-400 dark:text-gray-700">
              Created {formatDate(ask.createdAt ?? '')}
            </p>
            <p className="text-xs font-bold text-slate-400 dark:text-gray-700">
              Updated {formatDate(ask.updatedAt ?? '')}
            </p>
          </div>
        </div>
      </div>

      <SelectedTopics mode="view" selectedTopics={ask.tags} />

      <div
        className="my-4 md:my-6 w-full max-w-5xl mx-auto"
        style={{
          borderTop: '2px dashed #f43f5e',
        }}
      />

      <ContentController object={ask} />
    </div>
  );
};

export default AskPage;
