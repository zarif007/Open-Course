/* eslint-disable @next/next/no-img-element */
"use client";

import LargeHeading from "@/components/ui/LargeHeading";
import TooltipComponent from "@/components/ui/TooltipComponent";
import { ICourseAsk } from "@/types/courseAsk";
import { IUser } from "@/types/user";
import formatDate from "@/utils/formatDate";
import React, { useEffect, useState } from "react";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import SelectedTopics from "../course-details/SelectedTopics";

const AskPage = ({ ask }: { ask: ICourseAsk }) => {
  const author = ask.author as IUser;
  const [vote, setVote] = useState<{ upVote: string[]; downVote: string[] }>({
    upVote: [],
    downVote: [],
  });

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
              Created {formatDate(ask.createdAt ?? "")}
            </p>
            <p className="text-xs font-bold text-slate-400 dark:text-gray-700">
              Updated {formatDate(ask.updatedAt ?? "")}
            </p>
          </div>
        </div>
      </div>

      <div
        className="my-4 md:my-6 w-full max-w-5xl mx-auto"
        style={{
          borderTop: "2px dashed #f43f5e",
        }}
      />

      <div className="w-full flex items-center space-x-4 px-3 py-4">
        <div className="flex flex-col gap-4 items-center px-2 w-1/12">
          <TooltipComponent content="Up Vote">
            <BiSolidUpvote className="w-8 h-8 cursor-pointer hover:text-green-500" />
          </TooltipComponent>
          <p className="font-semibold text-lg">
            {vote.upVote.length - vote.downVote.length}
          </p>
          <TooltipComponent content="Down Vote">
            <BiSolidDownvote className="w-8 h-8 cursor-pointer hover:text-red-500" />
          </TooltipComponent>
        </div>

        <div className="w-11/12 flex flex-col space-y-2 font-semibold">
          <p>{ask.question}</p>
        </div>
      </div>

      <SelectedTopics selectedTopics={ask.tags} mode="view" />
    </div>
  );
};

export default AskPage;
