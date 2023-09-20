/* eslint-disable @next/next/no-img-element */
"use client";
import { IDiscussion } from "@/types/discussion";
import { IUser } from "@/types/user";
import formatDate from "@/utils/formatDate";
import React, { useState } from "react";
import DiscussDropdown from "./Discuss.Dropdown";

const Discussion = ({ discussion }: { discussion: IDiscussion }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const sender = discussion.sender as IUser;

  return (
    <div
      key={discussion.id}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ position: "relative" }}
    >
      <div className="my-3 p-3 flex space-x-3">
        <img
          src={sender.attributes.image_url}
          alt="dp"
          className="rounded-full h-10 w-10"
        />
        <div className="flex flex-col space-y-1">
          <div className="flex items-end space-x-2">
            <p className="text-md font-bold underline decoration-rose-500 decoration-2 truncate">
              {sender.attributes.last_name}
            </p>
            <p className="text-slate-600 dark:text-gray-600 text-sm font-semibold">
              {formatDate(discussion.updatedAt!)}
            </p>
          </div>
          <p
            className="text-md font-semibold"
            style={{ wordWrap: "break-word" }}
          >
            {discussion.comment}
          </p>
        </div>
      </div>
      <div
        className={`flex justify-end ${!isHovering && "hidden"}`}
        style={{ position: "absolute", top: "0", right: "0" }}
      >
        <DiscussDropdown />
      </div>
    </div>
  );
};

export default Discussion;
