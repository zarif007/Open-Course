import React, { useState } from "react";
import Paragraph from "../ui/Paragraph";
import { BsEmojiLaughing } from "react-icons/bs";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAppSelector } from "@/redux/store";
import { IDiscussion } from "@/types/discussion";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";
import axios from "axios";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
import Discussions from "./Discussions";
import DiscussionSkeleton from "../skeletons/Discussion.Skeleton";

const CourseDiscussion = ({
  courseId,
  topicId,
}: {
  courseId: string | undefined;
  topicId: string | undefined;
}) => {
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const commentCreationSchema: ZodType<{
    comment: string;
  }> = z.object({
    comment: z
      .string()
      .min(2, { message: "Comment Can not be less then 2 characters" })
      .max(1250, { message: "Comment Can not be more then 1250 characters" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    comment: string;
  }>({ resolver: zodResolver(commentCreationSchema) });

  const { data: discussions, isLoading } = useQuery({
    queryKey: [`discussions-${courseId}-${topicId}`],
    enabled: !!courseId && !!topicId,
    refetchInterval: 1000,
    queryFn: async () => {
      const { data } = await axios.get(
        `${nextApiEndPoint}/discussion?courseId=${courseId}&topicId=${topicId}`
      );
      return data.data;
    },
  });

  const onSubmit = async (data: { comment: string }) => {
    if (!signedInUser || !courseId) return;
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
    <main>
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
      {isLoading ? (
        <DiscussionSkeleton />
      ) : (
        <React.Fragment>
          {discussions && <Discussions discussions={discussions} />}
        </React.Fragment>
      )}
    </main>
  );
};

export default CourseDiscussion;
