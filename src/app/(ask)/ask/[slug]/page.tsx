/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { trpc } from '@/app/_trpc/client';
import { useRouter } from 'next/navigation';
import AskPage from '@/components/course-ask/Ask.Page';
import AskResponsePage from '@/components/course-ask/AskResponse.Page';

interface PageParams {
  params: {
    slug: string;
  };
}

const Ask = ({ params }: PageParams) => {
  const router = useRouter();
  const { data: ask, isLoading } = trpc.getAskBySlug.useQuery(params.slug, {
    onSuccess(data) {
      if (!data) router.push('/404');
    },
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : !ask ? (
        <p>Not Found</p>
      ) : (
        <div className="flex flex-col space-y-4">
          <AskPage ask={ask} />
          <AskResponsePage topic={ask.topic as string} version={ask.version} />
        </div>
      )}
    </div>
  );
};

export default Ask;
