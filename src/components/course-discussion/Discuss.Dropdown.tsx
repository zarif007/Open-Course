import React, { useState } from "react";
import { FaFaceGrinBeam, FaReply } from "react-icons/fa6";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import axios from "axios";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { IDiscussion } from "@/types/discussion";

const DiscussDropdown = ({
  discussion,
  setIsDeleting,
}: {
  discussion: IDiscussion;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const styles = {
    icon: `h-5 w-5 cursor-pointer`,
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`${nextApiEndPoint}/discussion/${discussion.id}`);
    } catch (error) {}
  };
  return (
    <div
      className={`rounded bg-slate-300 dark:bg-gray-900 px-2 py-2 flex space-x-3 w-fit`}
    >
      <FaFaceGrinBeam className={styles.icon} />
      <FaReply className={styles.icon} />
      <AiTwotoneEdit className={styles.icon} />
      <AiTwotoneDelete className={styles.icon} onClick={handleDelete} />
    </div>
  );
};

export default DiscussDropdown;
