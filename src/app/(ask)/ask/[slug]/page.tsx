/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import LargeHeading from "@/components/ui/LargeHeading";
import { IUser } from "@/types/user";
import formatDate from "@/utils/formatDate";
import SelectedTopics from "@/components/course-details/SelectedTopics";
import VotingHandler from "@/components/course-ask/VotingHandler";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

interface PageParams {
  params: {
    slug: string;
  };
}

const Ask = ({ params }: PageParams) => {
  const router = useRouter();
  const { data: ask, isLoading } = trpc.getAskBySlug.useQuery(params.slug, {
    onSuccess(data) {
      if (!data) router.push("/404");
    },
  });

  if (!isLoading && !ask) router.push("/404");

  const author = ask?.author as IUser;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : !ask ? (
        <p>Not Found</p>
      ) : (
        <React.Fragment>
          <LargeHeading
            size="sm"
            className="underline decoration-rose-500 decoration-4 text-start"
          >
            {ask.title}
          </LargeHeading>
          <div className="flex justify-start space-x-2 items-center my-2">
            <img
              src={author.image}
              alt="author"
              className="h-10 w-10 rounded"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-xs font-semibold">{author.name}</p>
              <div className="flex space-x-2">
                <p className="text-xs font-bold text-slate-400 dark:text-gray-700">
                  Created {formatDate(ask.createdAt ?? "")}
                </p>
                <p className="text-xs font-bold text-slate-400 dark:text-gray-700">
                  Updated {formatDate(ask.updatedAt ?? "")}
                </p>
              </div>
            </div>
          </div>
          <SelectedTopics mode="view" selectedTopics={ask.tags} />

          <div
            className="my-4 md:my-6 w-full max-w-5xl mx-auto"
            style={{
              borderTop: "2px dashed #f43f5e",
            }}
          />

          <div className="w-full flex items-start space-x-4 px-3 py-4">
            <VotingHandler ask={ask} />
            <div className="w-11/12 flex flex-col space-y-2">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(ask.question),
                }}
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Ask;
