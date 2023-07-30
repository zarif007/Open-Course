import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "./ui/Button";
import { z, ZodType } from "zod";
import { ICourseTopic } from "@/types/courseTopic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setCurrentCourseTopicForCreation } from "@/redux/features/course-creation-slice";

const CourseTopicCreationForm = ({
  submitData,
}: {
  submitData: (data: ICourseTopic) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const currentCourseTopic = useAppSelector(
    (state) => state.courseCreationReducer.value.currentCourseTopic
  );
  const course = useAppSelector(
    (state) => state.courseCreationReducer.value.course
  );

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
    id: -1,
    description: "",
  });

  useEffect(() => {
    setDefaultValue(currentCourseTopic);
    reset(currentCourseTopic);
  }, [currentCourseTopic, reset]);

  const resetCourseTopic = () => {
    dispatch(
      setCurrentCourseTopicForCreation({ title: "", url: "", description: "", id: -1 })
    );
    setDefaultValue({ title: "", url: "", description: "", id: -1 });
  };

  const onSubmit = (data: ICourseTopic) => {
    submitData({
      ...data,
      id:
        currentCourseTopic.id && currentCourseTopic.id > 0
          ? currentCourseTopic.id
          : (course.topics && course.topics.length > 0) ? (course.topics[course.topics.length - 1]?.id || 0) + 1 : 1,
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
            dispatch(
              setCurrentCourseTopicForCreation({
                ...currentCourseTopic,
                title: e.target.value,
              })
            )
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
            dispatch(
              setCurrentCourseTopicForCreation({
                ...currentCourseTopic,
                url: e.target.value,
              })
            )
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
          {currentCourseTopic.id && currentCourseTopic.id > 0
            ? "Update"
            : "Submit"}
        </Button>
        {currentCourseTopic.id && currentCourseTopic.id > 0 ? (
          <Button
            type="button"
            variant="general"
            className="dark:bg-slate-100 dark:text-gray-900"
            onClick={resetCourseTopic}
          >
            Add Another
          </Button>
        ) : (
          <></>
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
