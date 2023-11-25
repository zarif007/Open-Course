import React, { useEffect, useState } from "react";
import LargeHeading from "../ui/LargeHeading";
import RichTextEditor from "../ui/RichTextEditor";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "../ui/Input";
import { useForm } from "react-hook-form";
import { docContentSchema } from "@/validations/docContent";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { ICourseTopic, IDocContent } from "@/types/courseTopic";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setCurrentCourseTopicForCreation } from "@/redux/features/course-creation-slice";
import { setCurrentCourseTopicForUpdate } from "@/redux/features/course-update-slice";

const DocCreationForm = ({
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

  const form = useForm<z.infer<typeof docContentSchema>>({
    resolver: zodResolver(docContentSchema),
    mode: "onChange",
  });

  const [defaultValue, setDefaultValue] = useState<ICourseTopic>({
    versions: [
      {
        type: "doc_content",
        data: {
          title: "",
          content: "",
          duration: 0,
        },
      },
    ],
    topicID: -1,
  });

  useEffect(() => {
    setDefaultValue(currentCourseTopic);
    form.reset(
      currentCourseTopic.versions[currentCourseTopic.versions.length - 1].data
    );
  }, [currentCourseTopic, form.reset]);

  const resetCourseTopic = () => {
    const resetValue: ICourseTopic = {
      versions: [
        {
          type: "doc_content",
          data: {
            title: "",
            duration: 0,
            content: "",
          },
        },
      ],
      topicID: -1,
    };
    dispatch(
      mode === "creation"
        ? setCurrentCourseTopicForCreation(resetValue)
        : setCurrentCourseTopicForUpdate(resetValue)
    );
    setDefaultValue(resetValue);
  };

  const onSubmit = async (data: z.infer<typeof docContentSchema>) => {
    const wordsPerMinute = 250;
    const contentLength = data.content?.length ?? 250;
    const readingTime = contentLength / wordsPerMinute;

    const topic: IDocContent = {
      ...data,
      duration: Math.ceil(readingTime),
    };

    const courseTopics = course.topics as ICourseTopic[];

    const topicID =
      currentCourseTopic.topicID && currentCourseTopic.topicID > 0
        ? currentCourseTopic.topicID
        : courseTopics && courseTopics.length > 0
        ? (courseTopics[courseTopics.length - 1]?.topicID || 0) + 1
        : 1;

    submitData({
      id: currentCourseTopic.id ?? "",
      _id: currentCourseTopic._id ?? "",
      versions: [
        {
          type: "doc_content",
          data: topic,
        },
      ],
      topicID,
      sortID: topicID,
      createdAt: currentCourseTopic.createdAt ?? "",
      updatedAt: currentCourseTopic.updatedAt ?? "",
    });

    resetCourseTopic();
    form.reset();
  };

  const defaultData = defaultValue.versions[defaultValue.versions.length - 1]
    .data as IDocContent;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <LargeHeading size="sm">Write a Doc</LargeHeading>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Title of your question"
                    className="text-sm font-semibold"
                    defaultValue={defaultData.title}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <RichTextEditor
                    description={defaultData.content}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-4">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DocCreationForm;
