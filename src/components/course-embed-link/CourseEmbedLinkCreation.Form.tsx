import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '../ui/Button';
import { ICourseTopic, IFreeSourceContent } from '@/types/courseTopic';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setCurrentCourseTopicForCreation } from '@/redux/features/course-creation-slice';
import { Textarea } from '../ui/Textarea';
import ErrorMessage from '../ui/ErrorMessage';
import { topicInputFields } from '@/constants/courseTopics';
import { setCurrentCourseTopicForUpdate } from '@/redux/features/course-update-slice';
import { FreeSourceContentSchema } from '@/validations/freeSourceContent';

const CourseEmbedLinkCreationForm = ({
  submitData,
  mode,
}: {
  submitData: (data: ICourseTopic) => void;
  mode: 'creation' | 'edit';
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const currentCourseTopic = useAppSelector((state) =>
    mode === 'creation'
      ? state.courseCreationReducer.value.currentCourseTopic
      : state.courseUpdateReducer.value.currentCourseTopic
  );
  const course = useAppSelector((state) =>
    mode === 'creation'
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
  }>({ resolver: zodResolver(FreeSourceContentSchema) });

  const [defaultValue, setDefaultValue] = useState<ICourseTopic>({
    versions: [
      {
        type: 'free_source_content',
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
    setDefaultValue(currentCourseTopic);
    reset(
      currentCourseTopic.versions[currentCourseTopic.versions.length - 1].data
    );
  }, [currentCourseTopic, reset]);

  const resetCourseTopic = () => {
    const resetValue: ICourseTopic = {
      versions: [
        {
          type: 'free_source_content',
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
    description: string;
    duration: number;
  }) => {
    const courseTopics = course.topics as ICourseTopic[];

    const source = new URL(data.url).origin;

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
          data: { ...data, source },
        },
      ],
      topicID,
      sortID: topicID,
      createdAt: currentCourseTopic.createdAt ?? '',
      updatedAt: currentCourseTopic.updatedAt ?? '',
    });
    reset();
    resetCourseTopic();
  };

  const defaultData = defaultValue.versions[defaultValue.versions.length - 1]
    .data as IFreeSourceContent;

  return (
    <form
      className="flex flex-col justify-center items-center space-y-6 my-12 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      {topicInputFields.map((field) => {
        return (
          <div
            key={field.label}
            className="grid w-full max-w-md items-center gap-1.5"
          >
            <label htmlFor="text" className="font-bold">
              {field.label}
            </label>
            <Input
              type={field.type}
              placeholder="How to train your Dragon Part-4565"
              {...register(
                field.key,
                field.type === 'number' ? { valueAsNumber: true } : {}
              )}
              onChange={(e) => {
                const updated: ICourseTopic = {
                  ...currentCourseTopic,
                  versions: [
                    {
                      type: 'free_source_content',
                      data: {
                        ...currentCourseTopic.versions[0].data,
                        [field.key]: field.value(e),
                      } as IFreeSourceContent,
                    },
                  ],
                };
                dispatch(
                  mode === 'creation'
                    ? setCurrentCourseTopicForCreation(updated)
                    : setCurrentCourseTopicForUpdate(updated)
                );
              }}
              defaultValue={defaultData[field.key]}
              required
            />
            <ErrorMessage text={errors[field.key]?.message} className="" />
          </div>
        );
      })}

      <div className="grid w-full max-w-md items-center gap-1.5">
        <label htmlFor="url" className="font-bold">
          Description (Optional)
        </label>
        <Textarea
          {...register('description')}
          defaultValue=""
          placeholder="Huh!! I don't know"
          className="text-sm font-semibold"
        />
        <ErrorMessage text={errors.url?.message} className="" />
      </div>

      <div className="flex space-x-2 justify-start w-full max-w-md">
        {currentCourseTopic.topicID && currentCourseTopic.topicID > 0 ? (
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
          {currentCourseTopic.topicID && currentCourseTopic.topicID > 0
            ? 'Update'
            : 'Add'}
        </Button>
      </div>
    </form>
  );
};

export default CourseEmbedLinkCreationForm;
