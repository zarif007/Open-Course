"use client";

import React, { useEffect, useState } from "react";
import { FaReply } from "react-icons/fa6";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { IDiscussion } from "@/types/discussion";
import { useUser } from "@clerk/nextjs";
import { IUser } from "@/types/user";
import EmojiPickerDialog from "../ui/EmojiPicker.Dialog";

const DiscussDropdown = ({
  discussion,
  handleDelete,
  setEditingStatus,
  handleAddEmoji,
}: {
  discussion: IDiscussion;
  handleDelete: () => Promise<void>;
  setEditingStatus: React.Dispatch<
    React.SetStateAction<"no" | "editing" | "processing">
  >;
  handleAddEmoji: (emoji: string) => void;
}) => {
  const { user, isLoaded } = useUser();

  const [accessStatus, setAccessStatus] = useState<
    "unauthorized" | "can-interact" | "can-modify"
  >("unauthorized");

  const styles = {
    icon: `h-5 w-5 cursor-pointer`,
  };

  useEffect(() => {
    if (user && isLoaded) {
      const sender = discussion.sender as IUser;
      if (user.id === sender.externalId) setAccessStatus("can-modify");
      else setAccessStatus("can-interact");
    }
  }, [user, isLoaded]);

  return (
    <div className="flex space-x-2">
      {accessStatus !== "unauthorized" && (
        <div
          className={`rounded bg-slate-300 dark:bg-gray-900 px-2 py-2 flex space-x-3 w-fit`}
        >
          <EmojiPickerDialog handleAddEmoji={handleAddEmoji} />
          <FaReply className={styles.icon} />
          {accessStatus === "can-modify" && (
            <div className="flex space-x-3 w-fit">
              <AiTwotoneEdit
                className={styles.icon}
                onClick={() => setEditingStatus("editing")}
              />
              <AiTwotoneDelete className={styles.icon} onClick={handleDelete} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscussDropdown;
