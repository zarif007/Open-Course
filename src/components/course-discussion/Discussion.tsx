/* eslint-disable @next/next/no-img-element */
"use client";
import { IDiscussion } from "@/types/discussion";
import { IUser } from "@/types/user";
import formatDate from "@/utils/formatDate";
import React, { useState } from "react";
import DiscussDropdown from "./Discuss.Dropdown";
import axios from "axios";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { Textarea } from "../ui/Textarea";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentCreationSchema } from "@/validations/discussion";
import ErrorMessage from "../ui/ErrorMessage";

const Discussion = ({ discussion }: { discussion: IDiscussion }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [editingStatus, setEditingStatus] = useState<
    "no" | "editing" | "processing"
  >("no");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    comment: string;
  }>({ resolver: zodResolver(commentCreationSchema) });

  const sender = discussion.sender as IUser;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`${nextApiEndPoint}/discussion/${discussion.id}`);
    } catch (error) {}
  };

  const handleEdit = async (data: { comment: string }) => {
    try {
      setEditingStatus("processing");
      await axios.put(`${nextApiEndPoint}/discussion/${discussion.id}`, {
        ...discussion,
        comment: data.comment,
      });
      setEditingStatus("no");
    } catch (error) {}
  };

  return (
    <div
      key={discussion.id}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ position: "relative" }}
      className={`${isDeleting && "opacity-25"} w-full`}
    >
      <div className="my-3 p-3 flex space-x-3 w-full">
        <img
          src={sender.attributes.image_url}
          alt="dp"
          className="rounded-full h-10 w-10"
        />
        <div className="flex flex-col space-y-1 w-full">
          <div className="flex items-end space-x-2">
            <p className="text-md font-bold underline decoration-rose-500 decoration-2 truncate">
              {sender.attributes.last_name}
            </p>
            <p className="text-slate-600 dark:text-gray-600 text-sm font-semibold">
              {formatDate(discussion.updatedAt!)}
            </p>
          </div>
          <div className="w-full">
            {editingStatus !== "no" ? (
              <form onSubmit={handleSubmit(handleEdit)}>
                <Textarea
                  {...register("comment")}
                  className="text-md font-semibold white-space w-full"
                  defaultValue={discussion.comment}
                />
                <ErrorMessage text={errors.comment?.message} />
                <div className="flex justify-end space-x-2 mt-2">
                  <Button
                    variant="outline"
                    type="reset"
                    onClick={() => setEditingStatus("no")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={editingStatus === "processing"}
                  >
                    Edit
                  </Button>
                </div>
              </form>
            ) : (
              <p className="text-md font-semibold white-space">
                {discussion.comment}
              </p>
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex justify-end ${!isHovering && "hidden"}`}
        style={{ position: "absolute", top: "0", right: "0" }}
      >
        {!isDeleting && (
          <DiscussDropdown
            handleDelete={handleDelete}
            setEditingStatus={setEditingStatus}
          />
        )}
      </div>
    </div>
  );
};

export default Discussion;
