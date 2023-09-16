import React, { useState } from "react";
import Paragraph from "../ui/Paragraph";
import { BsEmojiLaughing } from "react-icons/bs";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAppSelector } from "@/redux/store";
import { IDiscuss } from "@/types/discuss";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";

const CourseDiscuss = () => {
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const commentCreationSchema: ZodType<{
    comment: string;
  }> = z.object({
    comment: z
      .string()
      .min(2, { message: "Comment Can not be less then 2 characters" })
      .max(250, { message: "Comment Can not be more then 250 characters" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    comment: string;
  }>({ resolver: zodResolver(commentCreationSchema) });

  const onSubmit = async (data: { comment: string }) => {
    if (!signedInUser) return;
    const payload: Partial<IDiscuss> = {
      sender: signedInUser?._id!,
      comment: data.comment,
    };
    console.log(payload);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("comment")}
        placeholder="Comment"
        className="py-8 text-lg mb-4 mt-8"
      />
      <ErrorMessage text={errors.comment?.message} />
      <div className="flex justify-end space-x-3 items-center">
        <BsEmojiLaughing className="h-8 w-8 cursor-pointer" />
        <Button type="submit">Comment</Button>
      </div>
    </form>
  );
};

export default CourseDiscuss;
