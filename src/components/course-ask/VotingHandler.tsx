"use client";

import React, { useState } from "react";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import TooltipComponent from "../ui/TooltipComponent";
import { ICourseAsk } from "@/types/courseAsk";
import { useAppSelector } from "@/redux/store";

const VotingHandler = ({ ask }: { ask: ICourseAsk }) => {
  const [votes, setVotes] = useState<{ upVote: string[]; downVote: string[] }>({
    upVote: ask.upVote as string[],
    downVote: ask.downVote as string[],
  });

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const handleVoting = async (type: "up" | "down") => {
    if (!signedInUser?.id) return;

    let updated = votes;
    if (type === "up" && !updated.upVote.includes(signedInUser.id)) {
      updated = {
        upVote: [...updated.upVote, signedInUser.id],
        downVote: updated.downVote.filter((x) => x != signedInUser.id),
      };
    } else if (type === "down" && !updated.downVote.includes(signedInUser.id)) {
      updated = {
        downVote: [...updated.downVote, signedInUser.id],
        upVote: updated.upVote.filter((x) => x != signedInUser.id),
      };
    }
    setVotes(updated);
  };
  return (
    <div className="flex flex-col gap-4 items-center px-2 w-1/12">
      <TooltipComponent content="Up Vote">
        <BiSolidUpvote
          onClick={() => handleVoting("up")}
          className={`w-8 h-8 cursor-pointer hover:text-green-500 ${
            votes.upVote.includes(signedInUser?.id ?? "") && "text-green-500"
          }`}
        />
      </TooltipComponent>
      <p className="font-semibold text-lg">
        {votes.upVote.length - votes.downVote.length}
      </p>
      <TooltipComponent content="Down Vote">
        <BiSolidDownvote
          onClick={() => handleVoting("down")}
          className={`w-8 h-8 cursor-pointer hover:text-red-500 ${
            votes.downVote.includes(signedInUser?.id ?? "") && "text-red-500"
          }`}
        />
      </TooltipComponent>
    </div>
  );
};

export default VotingHandler;
