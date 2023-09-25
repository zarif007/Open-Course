import React from "react";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";

const Ask = () => {
  return (
    <div className="w-full flex rounded p-3 border-2 border-slate-300 dark:border-gray-800">
      <div className="flex flex-col gap-2 items-center px-2">
        <BiSolidUpvote className="w-8 h-8 cursor-pointer hover:text-green-500" />
        <p className="font-semibold text-lg">4</p>
        <BiSolidDownvote className="w-8 h-8 cursor-pointer hover:text-red-500" />
      </div>
      <div className="w-full"></div>
    </div>
  );
};

export default Ask;
