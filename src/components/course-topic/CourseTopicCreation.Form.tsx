import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "../ui/Button";
import { z, ZodType } from "zod";
import { ICourseTopic } from "@/types/courseTopic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setCurrentCourseTopicForCreation } from "@/redux/features/course-creation-slice";
import { Textarea } from "../ui/Textarea";
import ErrorMessage from "../ui/ErrorMessage";

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

  const topicCreationSchema: ZodType<{
    title: string;
    url: string;
    description: string;
    duration: number;
  }> = z.object({
    title: z.string().min(2).max(50),
    url: z.string().url({ message: "Invalid url" }),
    description: z.string().min(0).max(500),
    duration: z.number().min(0).max(10000),
  });

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
    reset(currentCourseTopic.versions[0]);
  }, [currentCourseTopic, reset]);

  const resetCourseTopic = () => {
    dispatch(
      setCurrentCourseTopicForCreation({
        versions: [{ title: "", url: "", description: "", duration: 0 }],
        topicID: -1,
      })
    );
    setDefaultValue({
      versions: [{ title: "", url: "", description: "", duration: 0 }],
      topicID: -1,
    });
  };

  const onSubmit = (data: {
    title: string;
    url: string;
    description: string;
    duration: number;
  }) => {
    const courseTopics = course.topics as ICourseTopic[];

    submitData({
      versions: [data],
      topicID:
        currentCourseTopic.topicID && currentCourseTopic.topicID > 0
          ? currentCourseTopic.topicID
          : courseTopics && courseTopics.length > 0
          ? (courseTopics[courseTopics.length - 1]?.topicID || 0) + 1
          : 1,
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
                versions: [
                  {
                    ...currentCourseTopic.versions[0],
                    title: e.target.value,
                  },
                ],
              })
            )
          }
          defaultValue={defaultValue.versions[0].title}
          required
        />
        <ErrorMessage text={errors.title?.message} className="" />
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
                versions: [
                  {
                    ...currentCourseTopic.versions[0],
                    url: e.target.value,
                  },
                ],
              })
            )
          }
          defaultValue={defaultValue.versions[0].url}
          required
        />
        <ErrorMessage text={errors.url?.message} className="" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="number" className="font-bold">
          Approx. Duration in minute (ex. 10)
        </label>
        <Input
          type="number"
          placeholder="NOT 10m or 10.34"
          {...register("duration", { valueAsNumber: true })}
          onChange={(e) =>
            dispatch(
              setCurrentCourseTopicForCreation({
                ...currentCourseTopic,
                versions: [
                  {
                    ...currentCourseTopic.versions[0],
                    duration: isNaN(+e.target.value) ? 0 : +e.target.value,
                  },
                ],
              })
            )
          }
          defaultValue={defaultValue.versions[0].duration}
          required
        />
        <ErrorMessage text={errors.duration?.message} className="" />
      </div>

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
            : "Submit"}
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
