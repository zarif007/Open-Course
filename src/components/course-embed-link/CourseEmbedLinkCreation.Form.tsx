import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '../ui/Button';
import { ICourseTopic, IEmbedContent } from '@/types/courseTopic';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setCurrentCourseTopicForCreation } from '@/redux/features/course-creation-slice';
import { Textarea } from '../ui/Textarea';
import { topicInputFields } from '@/constants/courseTopics';
import { setCurrentCourseTopicForUpdate } from '@/redux/features/course-update-slice';
import { embedContentSchema } from '@/validations/embedContent';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { z } from 'zod';

const CourseEmbedLinkCreationForm = ({
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

  const form = useForm<z.infer<typeof embedContentSchema>>({
    resolver: zodResolver(embedContentSchema),
    mode: 'onChange',
  });

  const [defaultValue, setDefaultValue] = useState<ICourseTopic>({
    versions: [
      {
        type: 'free_source_content',
        creator: '',
        data: {
          title: '',
          url: '',
          description: '',
          duration: 0,
          source: '',
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
          type: 'free_source_content',
          creator: '',
          data: {
            title: '',
            url: '',
            description: '',
            duration: 0,
            source: '',
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

  const onSubmit = (data: {
    title: string;
    url: string;
    description?: string;
    duration: number;
  }) => {
    if (!signedInUser?.id) return;

    const source = new URL(data.url).origin;
    if (!course || !currentCourseTopic || mode === 'contribution') {
      submitData({
        id: '',
        _id: '',
        versions: [
          {
            type: 'free_source_content',
            creator: signedInUser.id,
            data: { ...data, source, description: data.description ?? '' },
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
            type: 'free_source_content',
            creator: signedInUser.id,
            data: { ...data, source, description: data.description ?? '' },
          },
        ],
        topicID,
        sortID: topicID,
        createdAt: currentCourseTopic.createdAt ?? '',
        updatedAt: currentCourseTopic.updatedAt ?? '',
      });
    }
    form.reset();
    resetCourseTopic();
  };

  const defaultData = defaultValue.versions[defaultValue.versions.length - 1]
    .data as IEmbedContent;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center space-y-3 my-12 w-full max-w-md mx-auto"
      >
        {topicInputFields.map((inputField) => {
          return (
            <FormField
              key={inputField.key}
              control={form.control}
              name={inputField.key}
              render={({ field }) => (
                <FormItem className="my-2 w-full">
                  <FormLabel>{inputField.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register(
                        inputField.key,
                        inputField.type === 'number'
                          ? { valueAsNumber: true }
                          : {}
                      )}
                      placeholder="How to train your Dragon Part-4565"
                      className="text-sm font-semibold"
                      defaultValue={defaultData[inputField.key]}
                      type={inputField.type}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="my-2 w-full">
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Huh I don't know"
                  className="text-sm font-semibold"
                  defaultValue=""
                  required={false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-2 justify-start w-full max-w-md">
          {currentCourseTopic &&
          currentCourseTopic.topicID &&
          currentCourseTopic.topicID > 0 ? (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={resetCourseTopic}
            >
              Add Another
            </Button>
          ) : (
            <></>
          )}
          <Button
            type="submit"
            variant="general"
            className="dark:bg-slate-100 dark:text-gray-900 w-full"
          >
            {currentCourseTopic &&
            currentCourseTopic.topicID &&
            currentCourseTopic.topicID > 0
              ? 'Update'
              : 'Add'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CourseEmbedLinkCreationForm;
