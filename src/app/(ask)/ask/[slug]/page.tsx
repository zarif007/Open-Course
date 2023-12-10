/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { trpc } from '@/app/_trpc/client';
import { useRouter } from 'next/navigation';
import AskPage from '@/components/course-ask/Ask.Page';
import AskResponsePage from '@/components/course-ask/AskResponse.Page';
import { ICourseAsk } from '@/types/courseAsk';
import { IUser } from '@/types/user';

interface PageParams {
  params: {
    slug: string;
  };
}

const Ask = ({ params }: PageParams) => {
  const { data: ask, isLoading } = trpc.getAskBySlug.useQuery(params.slug);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : !ask ? (
        <p>Not Found</p>
      ) : (
        <div className="flex flex-col space-y-4">
          <AskPage ask={ask as ICourseAsk} />
          <AskResponsePage
            questionId={ask.id as string}
            topic={ask.topic as string}
            version={ask.version}
          />
        </div>
      )}
    </div>
  );
};

export default Ask;
