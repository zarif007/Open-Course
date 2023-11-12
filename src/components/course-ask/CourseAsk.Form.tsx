"use client";

import React from "react";
import LargeHeading from "../ui/LargeHeading";
import ErrorMessage from "../ui/ErrorMessage";
import { Textarea } from "../ui/Textarea";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseAskInputSchema } from "@/validations/courseAsk";

const CourseAskForm = () => {
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

  const onSubmit = (data: { title: string; question: string }) => {
    console.log(data);
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
            placeholder="Huh!! I don't know"
            className="text-sm font-semibold h-20"
          />
          <ErrorMessage text={errors.question?.message} className="" />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CourseAskForm;
