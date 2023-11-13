/* eslint-disable @next/next/no-img-element */
"use client";

import { ICourseAsk } from "@/types/courseAsk";
import React from "react";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import LargeHeading from "../ui/LargeHeading";
import Paragraph from "../ui/Paragraph";
import { Button } from "../ui/Button";
import { IUser } from "@/types/user";
import { MdQuestionAnswer } from "react-icons/md";

const Ask = ({ ask }: { ask: ICourseAsk }) => {
  const author = ask.author as IUser;
  return (
    <div className="w-full flex items-center space-x-4 rounded p-3 border-2 border-slate-300 dark:border-gray-800">
      <div className="flex flex-col gap-4 items-center px-2 w-1/12">
        {/* <BiSolidUpvote className="w-8 h-8 cursor-pointer hover:text-green-500" />
        <p className="font-semibold text-lg">
          {ask.upVote.length - ask.downVote.length}
        </p>
        <BiSolidDownvote className="w-8 h-8 cursor-pointer hover:text-red-500" /> */}
        <div className="flex space-x-1 items-center justify-center">
          <BiSolidUpvote className="w-8 h-8" />
          <p className="font-semibold text-md">
            {ask.upVote.length + ask.downVote.length}
          </p>
        </div>
        <div className="flex space-x-1 items-center justify-center">
          <MdQuestionAnswer className="w-8 h-8" />
          <p className="font-semibold text-md">
            {ask.upVote.length + ask.downVote.length}
          </p>
        </div>
      </div>
      <div className="w-11/12 flex flex-col space-y-2">
        <p className="text-xl font-bold uppercase truncate underline decoration-rose-500 decoration-2 text-start">
          {ask.title}
        </p>
        <div className="flex justify-start space-x-2 items-center">
          <img src={author.image} alt="author" className="h-6 w-6 rounded" />
          <p className="text-xs font-semibold">{author.name}</p>
        </div>
        <p className="text-sm font-medium text-start">
          {ask.question.slice(0, 100)}...
        </p>
        <div className="mt-4 flex justify-end">
          <Button>View</Button>
        </div>
      </div>
    </div>
  );
};

export default Ask;
