"use client";

import { useAppSelector } from "@/redux/store";
import { IDiscussion } from "@/types/discussion";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { commentCreationSchema } from "@/validations/discussion";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/Textarea";
import ErrorMessage from "../ui/ErrorMessage";
import { BsEmojiLaughing } from "react-icons/bs";
import { Button } from "../ui/Button";

const DiscussionCreationForm = ({
  courseId,
  topicId,
}: {
  courseId: string | undefined;
  topicId: string | undefined;
}) => {
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    comment: string;
  }>({ resolver: zodResolver(commentCreationSchema) });

  const onSubmit = async (data: { comment: string }) => {
    if (!signedInUser || !topicId || !courseId) return;
    const payload: Partial<IDiscussion> = {
      sender: signedInUser?._id!,
      course: courseId,
      topic: topicId,
      comment: data.comment,
    };
    reset();
    await axios.post(`${nextApiEndPoint}/discussion`, payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        {...register("comment")}
        placeholder="Comment"
        className="text-lg mb-4 mt-8 font-semibold"
      />
      <ErrorMessage text={errors.comment?.message} />
      <div className="flex justify-end space-x-3 items-center">
        <BsEmojiLaughing className="h-8 w-8 cursor-pointer" />
        <Button type="submit">Comment</Button>
      </div>
    </form>
  );
};

export default DiscussionCreationForm;
