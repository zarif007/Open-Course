import React from "react";
import {
  BsEmojiLaughing,
  BsReplyAll,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaFaceGrinBeam, FaReply } from "react-icons/fa6";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";

const DiscussDropdown = () => {
  const styles = {
    icon: `h-5 w-5 cursor-pointer`,
  };
  return (
    <div className="rounded bg-slate-300 dark:bg-gray-900 px-2 py-2 flex space-x-3 w-fit">
      <FaFaceGrinBeam className={styles.icon} />
      <FaReply className={styles.icon} />
      <AiTwotoneEdit className={styles.icon} />
      <AiTwotoneDelete className={styles.icon} />
    </div>
  );
};

export default DiscussDropdown;
