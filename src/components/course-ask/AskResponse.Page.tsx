import React from 'react';
import AskResponses from './AskResponses';
import AskResponseForm from './AskResponse.Form';
import { trpc } from '@/app/_trpc/client';

const AskResponsePage = ({
  topic,
  version,
}: {
  topic: string;
  version: number;
}) => {
  const { data: responses, isLoading } = trpc.getAskResponses.useQuery({
    topic,
    version,
  });

  return (
    <div className="flex flex-col space-y-4 mt-24">
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <AskResponses responses={responses ?? []} />
      )}
      <AskResponseForm topic={topic} version={version} />
    </div>
  );
};

export default AskResponsePage;
