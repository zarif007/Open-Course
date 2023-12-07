'use client';

import React, { useState } from 'react';
import LargeHeading from '../ui/LargeHeading';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseAskInputSchema } from '@/validations/courseAsk';
import { ICourseAsk } from '@/types/courseAsk';
import { useAppSelector } from '@/redux/store';
import { trpc } from '@/app/_trpc/client';
import { toast } from '../ui/Toast';
import { DialogClose } from '../ui/Dialog';
import createSlug from '@/utils/createSlug';
import SelectedTopics from '../course-details/SelectedTopics';
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

  const form = useForm<z.infer<typeof courseAskInputSchema>>({
    resolver: zodResolver(courseAskInputSchema),
    mode: 'onChange',
  });

  const [loadingStatus, setLoadingStatus] = useState<
    'ready' | 'loading' | 'done'
  >('ready');

  const [selectedTags, setSelectedTags] = useState<string[]>(course.categories);

  const version = currentCourseTopic.versions.length - 1;

  const asks = trpc.getCourseAsks.useQuery({
    topic: currentCourseTopic.id as string,
    version,
  });

  const createCourseAsk = trpc.createCourseAsks.useMutation({
    onSettled: () => {
      asks.refetch();
    },
  });

  const handleTagRemove = (values: string[]) => {
    setSelectedTags(values);
  };

  const onSubmit = async (data: z.infer<typeof courseAskInputSchema>) => {
    if (!signedInUser || !currentCourseTopic.id || loadingStatus !== 'ready')
      return;

    setLoadingStatus('loading');

    const ask: Partial<ICourseAsk> = {
      author: signedInUser?.id!,
      topic: currentCourseTopic.id as string,
      version,
      title: data.title,
      question: data.question,
      slug: createSlug(data.title!),
      tags: selectedTags,
    };

    try {
      await createCourseAsk.mutateAsync(ask);
      toast({
        title: 'Success',
        type: 'success',
        message: 'Question created successfully',
      });
      setLoadingStatus('done');
    } catch (error) {
      console.log(error);
      toast({
        title: 'Something went wrong',
        type: 'error',
        message: 'please Try again later',
      });
      setLoadingStatus('ready');
    }
  };

  return (
    <div className="w-full">
      <LargeHeading size="sm">Ask a Question</LargeHeading>
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <RichTextEditor description={''} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SelectedTopics
            selectedTopics={course.categories}
            mode="creation"
            setSelectedTopics={handleTagRemove}
          />

          {loadingStatus !== 'done' ? (
            <Button
              type="submit"
              className="w-full"
              isLoading={loadingStatus === 'loading'}
            >
              Submit
            </Button>
          ) : (
            <DialogClose className="w-full">
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DialogClose>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CourseAskForm;
