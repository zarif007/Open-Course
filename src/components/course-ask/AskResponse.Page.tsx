import React from 'react';
import AskResponses from './AskResponses';
import AskResponseForm from './AskResponse.Form';
import { trpc } from '@/app/_trpc/client';
import { IAskResponse } from '@/types/courseAsk/response';

const AskResponsePage = ({
  questionId,
  topic,
  version,
}: {
  questionId: string;
  topic: string;
  version: number;
}) => {
  const { data: responses, isLoading } = trpc.getAskResponses.useQuery({
    questionId,
    topic,
    version,
  });

  return (
    <div className="flex flex-col space-y-4 mt-24">
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <AskResponses responses={(responses as IAskResponse[]) ?? []} />
      )}
      <AskResponseForm
        questionId={questionId}
        topic={topic}
        version={version}
      />
    </div>
  );
};

export default AskResponsePage;
