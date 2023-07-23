import React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "./ui/Button";
import { z, ZodType } from "zod";
import { ICourseTopic } from "@/types/courseTopic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const CourseTopicCreationForm = ({
  submitData,
}: {
  submitData: (data: ICourseTopic) => void;
}) => {
  const topicCreationSchema: ZodType<ICourseTopic> = z
    .object({
      title: z.string().min(2).max(50),
      url: z.string().url({ message: "Invalid url" }),
    })


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICourseTopic>({ resolver: zodResolver(topicCreationSchema) });
  return (
    <form
      className="flex flex-col justify-center items-center space-y-6 my-12"
      onSubmit={handleSubmit(submitData)}
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="text" className="font-bold">
          Topic Name
        </label>
        <Input
          type="text"
          placeholder="How to turn on a Computer part-1"
          {...register("title")}
          required
        />
        <ErrorMessage text={errors.title?.message} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="text" className="font-bold">
          Link (YT / Blog URL)
        </label>
        <Input
          type="text"
          placeholder="https://www.youtube.com/watch?v=Tx0ntUobTu8"
          {...register("url")}
          required
        />
        <ErrorMessage text={errors.url?.message} />
      </div>

      <div className="flex justify-start">
        <Button
          type="submit"
          variant="general"
          className="dark:bg-slate-100 dark:text-gray-900"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

const ErrorMessage = ({text}: {text: string | undefined}) => {
    if(!text) return null
  return (
    <div className="text-red-600 font-sm font-semibold">{text}</div>
  );
}

export default CourseTopicCreationForm;
