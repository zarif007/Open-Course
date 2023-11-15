"use client";

import React, { useState } from "react";
import LargeHeading from "../ui/LargeHeading";
import ErrorMessage from "../ui/ErrorMessage";
import { Textarea } from "../ui/Textarea";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseAskInputSchema } from "@/validations/courseAsk";
import { ICourseAsk } from "@/types/courseAsk";
import { useAppSelector } from "@/redux/store";
import { trpc } from "@/app/_trpc/client";
import { toast } from "../ui/Toast";
import { DialogClose } from "../ui/Dialog";
import createSlug from "@/utils/createSlug";
import SelectedTopics from "../course-details/SelectedTopics";

const CourseAskForm = () => {
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const course = useAppSelector(
    (state) => state.courseViewReducer.value.course
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    title: string;
    question: string;
  }>({
    resolver: zodResolver(courseAskInputSchema),
  });

  const [loadingStatus, setLoadingStatus] = useState<
    "ready" | "loading" | "done"
  >("ready");

  const [selectedTags, setSelectedTags] = useState<string[]>(course.categories);

  const asks = trpc.getCourseAsks.useQuery({
    topicId: currentCourseTopic.id as string,
  });

  const createCourseAsk = trpc.createCourseAsks.useMutation({
    onSettled: () => {
      asks.refetch();
    },
  });

  const handleTagRemove = (values: string[]) => {
    setSelectedTags(values);
  };

  const onSubmit = async (data: { title: string; question: string }) => {
    if (!signedInUser || !currentCourseTopic.id || loadingStatus !== "ready")
      return;

    setLoadingStatus("loading");

    const ask: Partial<ICourseAsk> = {
      author: signedInUser?.id!,
      topic: currentCourseTopic.id as string,
      title: data.title,
      question: data.question,
      slug: createSlug(data.title),
      tags: course.categories,
    };

    try {
      await createCourseAsk.mutateAsync(ask);
      toast({
        title: "Success",
        type: "success",
        message: "Question created successfully",
      });
      setLoadingStatus("done");
    } catch {
      toast({
        title: "Complete required fields",
        type: "error",
        message: "Something went wrong",
      });
      setLoadingStatus("ready");
    }
  };

  return (
    <div className="w-full">
      <LargeHeading size="sm">Ask a Question</LargeHeading>
      <form
        className="flex flex-col space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="url" className="font-bold">
            Title
          </label>
          <Input
            defaultValue=""
            {...register("title")}
            placeholder="Title of your question"
            className="text-sm font-semibold"
          />
          <ErrorMessage text={errors.title?.message} className="" />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="url" className="font-bold">
            Description
          </label>
          <Textarea
            {...register("question")}
            defaultValue=""
            placeholder="Your question"
            className="text-sm font-semibold h-20"
          />
          <ErrorMessage text={errors.question?.message} className="" />
        </div>
        <div className="grid w-full items-center">
          <label htmlFor="url" className="font-bold">
            Tags
          </label>
          <SelectedTopics
            selectedTopics={selectedTags}
            mode="creation"
            setSelectedTopics={handleTagRemove}
          />
        </div>

        {loadingStatus !== "done" ? (
          <Button
            type="submit"
            className="w-full"
            isLoading={loadingStatus === "loading"}
          >
            Submit
          </Button>
        ) : (
          <DialogClose>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DialogClose>
        )}
      </form>
    </div>
  );
};

export default CourseAskForm;
