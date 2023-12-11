import React, { useEffect, useState } from 'react';
import LargeHeading from '../ui/LargeHeading';
import RichTextEditor from '../ui/RichTextEditor';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '../ui/Input';
import { useForm } from 'react-hook-form';
import { docContentSchema } from '@/validations/docContent';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/Button';
import { ICourseTopic, IDocContent } from '@/types/courseTopic';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { setCurrentCourseTopicForCreation } from '@/redux/features/course-creation-slice';
import { setCurrentCourseTopicForUpdate } from '@/redux/features/course-update-slice';

const DocCreationForm = ({
  submitData,
  mode,
}: {
  submitData: (data: ICourseTopic) => void;
  mode: 'creation' | 'edit' | 'contribution';
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const currentCourseTopic = useAppSelector((state) =>
    mode === 'creation'
      ? state.courseCreationReducer.value.currentCourseTopic
      : mode === 'edit'
        ? state.courseUpdateReducer.value.currentCourseTopic
        : null
  );
  const course = useAppSelector((state) =>
    mode === 'creation'
      ? state.courseCreationReducer.value.course
      : mode === 'edit'
        ? state.courseUpdateReducer.value.course
        : null
  );

  const form = useForm<z.infer<typeof docContentSchema>>({
    resolver: zodResolver(docContentSchema),
    mode: 'onChange',
  });

  const [defaultValue, setDefaultValue] = useState<ICourseTopic>({
    versions: [
      {
        type: 'doc_content',
        creator: '',
        data: {
          title: '',
          content: '',
          duration: 0,
        },
      },
    ],
    topicID: -1,
  });

  useEffect(() => {
    if (!currentCourseTopic || !course || mode === 'contribution') return;
    setDefaultValue(currentCourseTopic);
    form.reset(
      currentCourseTopic.versions[currentCourseTopic.versions.length - 1].data
    );
  }, [currentCourseTopic, form.reset]);

  const resetCourseTopic = () => {
    const resetValue: ICourseTopic = {
      versions: [
        {
          type: 'doc_content',
          creator: '',
          data: {
            title: '',
            duration: 0,
            content: '',
          },
        },
      ],
      topicID: -1,
    };
    dispatch(
      mode === 'creation'
        ? setCurrentCourseTopicForCreation(resetValue)
        : setCurrentCourseTopicForUpdate(resetValue)
    );
    setDefaultValue(resetValue);
  };

  const onSubmit = async (data: z.infer<typeof docContentSchema>) => {
    if (!signedInUser?.id) return;

    const wordsPerMinute = 250;
    const contentLength = data.content?.length ?? 250;
    const readingTime = contentLength / wordsPerMinute;

    const topic: IDocContent = {
      ...data,
      duration: Math.ceil(readingTime),
    };

    if (!currentCourseTopic || !course || mode === 'contribution') {
      submitData({
        id: '',
        _id: '',
        versions: [
          {
            type: 'doc_content',
            creator: signedInUser.id,
            data: topic,
          },
        ],
        topicID: 1,
        sortID: 1,
        createdAt: '',
        updatedAt: '',
      });
    } else {
      const courseTopics = course.topics as ICourseTopic[];

      const topicID =
        currentCourseTopic.topicID && currentCourseTopic.topicID > 0
          ? currentCourseTopic.topicID
          : courseTopics && courseTopics.length > 0
            ? (courseTopics[courseTopics.length - 1]?.topicID || 0) + 1
            : 1;

      submitData({
        id: currentCourseTopic.id ?? '',
        _id: currentCourseTopic._id ?? '',
        versions: [
          {
            type: 'doc_content',
            creator: signedInUser.id,
            data: topic,
          },
        ],
        topicID,
        sortID: topicID,
        createdAt: currentCourseTopic.createdAt ?? '',
        updatedAt: currentCourseTopic.updatedAt ?? '',
      });
    }

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
