import { AppDispatch, useAppSelector } from '@/redux/store';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IEnrollState } from '@/types/enrollState';
import { ICourseTopic } from '@/types/courseTopic';
import { ICourse } from '@/types/course';
import canBeParsedToInt from '@/utils/canBeParsedToInt';
import {
  setCourseForView,
  setCurrentCourseTopicForView,
  setEnrollState,
} from '@/redux/features/course-view-slice';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import axios from 'axios';

const useCourseGuard = (
  course: ICourse,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();
  const topicId = searchParams?.get('topicId');

  const router = useRouter();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const isUserLoaded = useAppSelector(
    (state) => state.signedInUserReducer.value.isLoaded
  );

  const isValid = (topicId: number, enrollState: IEnrollState): boolean => {
    const currentTopic = enrollState.currentTopic as ICourseTopic;
    return (
      topicId === currentTopic.topicID ||
      course.topicPrivacy === 'open' ||
      enrollState.finishedTopics.includes(topicId.toString())
    );
  };

  // Incase the next topic based on sequence is deleted or altered
  const findTheNextTopic = (
    potentialTopicID: number,
    enrollState: IEnrollState
  ): ICourseTopic => {
    const courseTopics = course.topics as ICourseTopic[];

    // Default
    let currentTopic = courseTopics[0];

    for (let i = 0; i < courseTopics.length; i++) {
      const topic = courseTopics[i];
      if (topic.topicID === potentialTopicID) {
        return topic;
      }

      if (
        enrollState.finishedTopics.includes(topic.topicID.toString()) ||
        course.topicPrivacy === 'open'
      ) {
        currentTopic = topic;
      }
    }

    return currentTopic;
  };

  const updateEnrollStateBasedOnTopicPrivacy = async (
    topicId: string,
    enrollState: IEnrollState
  ) => {
    if (
      course.topicPrivacy === 'open' &&
      !enrollState.finishedTopics.includes(topicId)
    ) {
      const state: IEnrollState = {
        ...enrollState,
        currentTopic: findTheNextTopic(parseInt(topicId), enrollState),
        finishedTopics: [...enrollState.finishedTopics, topicId],
      };

      try {
        await axios.put(`${nextApiEndPoint}/enrollState`, state);
        return state;
      } catch (error) {
        return enrollState;
      }
    }

    return enrollState;
  };

  const actionBasedOnEnrollState = async () => {
    try {
      let { data: enrollState } = await (
        await fetch(
          `${nextApiEndPoint}/enrollState?user=${signedInUser?.id}&course=${course.id}`
        )
      ).json();

      if (!enrollState) {
        router.push(`/course-landing/${course.slug}`);
      } else {
        if (
          !topicId ||
          !canBeParsedToInt(topicId) ||
          !isValid(parseInt(topicId), enrollState)
        ) {
          const currentTopic = enrollState.currentTopic as ICourseTopic;
          /*
            In this case current topic or any finished topic or 
            topic 0 will be the next topic 
          */
          const nextTopic = findTheNextTopic(currentTopic.topicID, enrollState);
          router.push(`/course/${course.slug}?topicId=${nextTopic.topicID}`);
          dispatch(setCurrentCourseTopicForView(nextTopic));
        } else {
          enrollState = await updateEnrollStateBasedOnTopicPrivacy(
            topicId,
            enrollState
          );
          const nextTopic = findTheNextTopic(parseInt(topicId), enrollState);
          if (parseInt(topicId) !== nextTopic.topicID) {
            router.push(`/course/${course.slug}?topicId=${nextTopic.topicID}`);
          }
          dispatch(setCurrentCourseTopicForView(nextTopic));
        }
        setIsLoading(false);

        dispatch(setEnrollState(enrollState));

        dispatch(setCourseForView(course));
      }
    } catch {
      router.push(`/course-landing/${course.slug}`);
    }
  };

  useEffect(() => {
    if (!isUserLoaded) return;

    if (!signedInUser?.id) {
      router.push(`/course-landing/${course.slug}`);
    } else {
      actionBasedOnEnrollState();
    }
  }, [topicId, course, signedInUser?.id, isUserLoaded]);
};

export default useCourseGuard;
