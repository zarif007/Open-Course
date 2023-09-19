import React from "react";
import {
  BsEmojiLaughing,
  BsReplyAll,
  BsThreeDotsVertical,
} from "react-icons/bs";

const DiscussDropdown = () => {
  return (
    <div className="rounded bg-slate-300 dark:bg-gray-800 px-2 py-1 flex space-x-1">
      <BsEmojiLaughing className="h-6 w-6 cursor-pointer" />
      <BsReplyAll className="h-6 w-6 cursor-pointer" />
      <BsThreeDotsVertical className="h-6 w-6 cursor-pointer" />
    </div>
  );
};

export default DiscussDropdown;
