import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "../ui/Button";
import { ICourseTopic } from "@/types/courseTopic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setCurrentCourseTopicForCreation } from "@/redux/features/course-creation-slice";
import { Textarea } from "../ui/Textarea";
import ErrorMessage from "../ui/ErrorMessage";
import { topicCreationSchema } from "@/validations/topicCreation";
import { topicInputFields } from "@/constants/courseTopics";
import { setCurrentCourseTopicForUpdate } from "@/redux/features/course-update-slice";

const CourseTopicCreationForm = ({
  submitData,
  mode,
}: {
  submitData: (data: ICourseTopic) => void;
  mode: "creation" | "edit";
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const currentCourseTopic = useAppSelector((state) =>
    mode === "creation"
      ? state.courseCreationReducer.value.currentCourseTopic
      : state.courseUpdateReducer.value.currentCourseTopic
  );
  const course = useAppSelector((state) =>
    mode === "creation"
      ? state.courseCreationReducer.value.course
      : state.courseUpdateReducer.value.course
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    title: string;
    url: string;
    description: string;
    duration: number;
  }>({ resolver: zodResolver(topicCreationSchema) });

  const [defaultValue, setDefaultValue] = useState<ICourseTopic>({
    versions: [
      {
        title: "",
        url: "",
        description: "",
        duration: 0,
      },
    ],
    topicID: -1,
  });

  useEffect(() => {
    setDefaultValue(currentCourseTopic);
    reset(currentCourseTopic.versions[currentCourseTopic.versions.length - 1]);
  }, [currentCourseTopic, reset]);

  const resetCourseTopic = () => {
    const resetValue: ICourseTopic = {
      versions: [{ title: "", url: "", description: "", duration: 0 }],
      topicID: -1,
    };
    dispatch(
      mode === "creation"
        ? setCurrentCourseTopicForCreation(resetValue)
        : setCurrentCourseTopicForUpdate(resetValue)
    );
    setDefaultValue(resetValue);
  };

  const onSubmit = (data: {
    title: string;
    url: string;
    description: string;
    duration: number;
  }) => {
    const courseTopics = course.topics as ICourseTopic[];

    submitData({
      id: currentCourseTopic.id ?? "",
      _id: currentCourseTopic._id ?? "",
      versions: [data],
      topicID:
        currentCourseTopic.topicID && currentCourseTopic.topicID > 0
          ? currentCourseTopic.topicID
          : courseTopics && courseTopics.length > 0
          ? (courseTopics[courseTopics.length - 1]?.topicID || 0) + 1
          : 1,
      createdAt: currentCourseTopic.createdAt ?? "",
      updatedAt: currentCourseTopic.updatedAt ?? "",
    });
    reset();
    resetCourseTopic();
  };

  return (
    <form
      className="flex flex-col justify-center items-center space-y-6 my-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      {topicInputFields.map((field) => {
        return (
          <div
            key={field.label}
            className="grid w-full max-w-sm items-center gap-1.5"
          >
            <label htmlFor="text" className="font-bold">
              {field.label}
            </label>
            <Input
              type={field.type}
              placeholder="How to train your Dragon Part-4565"
              {...register(
                field.key,
                field.type === "number" ? { valueAsNumber: true } : {}
              )}
              onChange={(e) => {
                const updated: ICourseTopic = {
                  ...currentCourseTopic,
                  versions: [
                    {
                      ...currentCourseTopic.versions[0],
                      [field.key]: field.value(e),
                    },
                  ],
                };
                dispatch(
                  mode === "creation"
                    ? setCurrentCourseTopicForCreation(updated)
                    : setCurrentCourseTopicForUpdate(updated)
                );
              }}
              defaultValue={
                defaultValue.versions[defaultValue.versions.length - 1][
                  field.key
                ]
              }
              required
            />
            <ErrorMessage text={errors[field.key]?.message} className="" />
          </div>
        );
      })}

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="url" className="font-bold">
          Description (Optional)
        </label>
        <Textarea
          {...register("description")}
          defaultValue=""
          placeholder="Huh!! I don't know"
          className="text-sm font-semibold"
        />
        <ErrorMessage text={errors.url?.message} className="" />
      </div>

      <div className="flex space-x-2 justify-start">
        <Button
          type="submit"
          variant="general"
          className="dark:bg-slate-100 dark:text-gray-900"
        >
          {currentCourseTopic.topicID && currentCourseTopic.topicID > 0
            ? "Update"
            : "Add"}
        </Button>
        {currentCourseTopic.topicID && currentCourseTopic.topicID > 0 ? (
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

export default CourseTopicCreationForm;
