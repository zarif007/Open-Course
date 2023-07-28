import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "./ui/Button";
import { z, ZodType } from "zod";
import { ICourseTopic } from "@/types/courseTopic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import shortid from "shortid";

const CourseTopicCreationForm = ({
  submitData,
  courseTopic,
  setCourseTopic,
}: {
  submitData: (data: ICourseTopic) => void;
  courseTopic: ICourseTopic;
  setCourseTopic: React.Dispatch<React.SetStateAction<ICourseTopic>>;
}) => {
  const topicCreationSchema: ZodType<ICourseTopic> = z.object({
    title: z.string().min(2).max(50),
    url: z.string().url({ message: "Invalid url" }),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICourseTopic>({ resolver: zodResolver(topicCreationSchema) });

  const [defaultValue, setDefaultValue] = useState<ICourseTopic>({
    title: "",
    url: "",
    id: "",
    description: "",
  });

  useEffect(() => {
    setDefaultValue(courseTopic);
    reset(courseTopic);
  }, [courseTopic]);

  const resetCourseTopic = () => {
    setCourseTopic({ title: "", url: "", description: "", id: "" });
    setDefaultValue({ title: "", url: "", description: "", id: "" });
  };

  const onSubmit = (data: ICourseTopic) => {
    submitData({
      ...data,
      id: courseTopic.id !== "" ? courseTopic.id : shortid.generate(),
    });
    reset();
    resetCourseTopic();
  };

  return (
    <form
      className="flex flex-col justify-center items-center space-y-6 my-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="text" className="font-bold">
          Topic Name
        </label>
        <Input
          type="text"
          placeholder="How to train your Dragon Part-4565"
          {...register("title")}
          onChange={(e) =>
            setCourseTopic({ ...courseTopic, title: e.target.value })
          }
          defaultValue={defaultValue.title}
          required
        />
        <ErrorMessage text={errors.title?.message} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="url" className="font-bold">
          Link (YT / Blog URL)
        </label>
        <Input
          type="url"
          placeholder="https://www.youtube.com/watch?v=Tx0ntUobTu8"
          {...register("url")}
          onChange={(e) =>
            setCourseTopic({ ...courseTopic, url: e.target.value })
          }
          defaultValue={defaultValue.url}
          required
        />
        <ErrorMessage text={errors.url?.message} />
      </div>

      <div className="flex space-x-2 justify-start">
        <Button
          type="submit"
          variant="general"
          className="dark:bg-slate-100 dark:text-gray-900"
        >
          {courseTopic.id !== "" ? "Edit" : "Submit"}
        </Button>
        {courseTopic.id !== "" && (
          <Button
            type="button"
            variant="general"
            className="dark:bg-slate-100 dark:text-gray-900"
            onClick={resetCourseTopic}
          >
            Add Another
          </Button>
        )}
      </div>
    </form>
  );
};

const ErrorMessage = ({ text }: { text: string | undefined }) => {
  if (!text) return null;
  return <div className="text-red-600 font-sm font-semibold">{text}</div>;
};

export default CourseTopicCreationForm;
