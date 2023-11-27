import { AppDispatch, useAppSelector } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IEnrollState } from "@/types/enrollState";
import { ICourseTopic } from "@/types/courseTopic";
import { ICourse } from "@/types/course";
import canBeParsedToInt from "@/utils/canBeParsedToInt";
import {
  setCourseForView,
  setCurrentCourseTopicForView,
  setEnrollState,
} from "@/redux/features/course-view-slice";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { EnrollState } from "@/lib/models/enrollState.model";
import sortCompareBasedOnSortID from "@/utils/sortCompareBasedOnSortID";

const useCourseGuard = (
  course: ICourse,
  slug: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();
  const topicId = searchParams?.get("topicId");

  const router = useRouter();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const isValid = (topicId: number, enrollState: IEnrollState): boolean => {
    const currentTopic = enrollState.currentTopic as ICourseTopic;

    return (
      topicId === currentTopic.topicID ||
      enrollState.finishedTopics.includes(topicId.toString())
    );
  };

  // Incase the next topic based on sequence is deleted
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

      if (enrollState.finishedTopics.includes(topic.topicID.toString())) {
        currentTopic = topic;
      }
    }

    return currentTopic;
  };

  const actionBasedOnEnrollState = async () => {
    try {
      const { data: enrollState } = await (
        await fetch(
          `${nextApiEndPoint}/enrollState?user=${signedInUser?.id}&course=${course.id}`
        )
      ).json();

      if (!enrollState) {
        router.push(`/course-landing/${slug}`);
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
          router.push(`/course/${slug}?topicId=${nextTopic.topicID}`);
          dispatch(setCurrentCourseTopicForView(nextTopic));
        } else {
          const nextTopic = findTheNextTopic(parseInt(topicId), enrollState);
          if (parseInt(topicId) !== nextTopic.topicID) {
            router.push(`/course/${slug}?topicId=${nextTopic.topicID}`);
          }
          dispatch(setCurrentCourseTopicForView(nextTopic));
        }
        setIsLoading(false);

        dispatch(setEnrollState(enrollState));

        dispatch(setCourseForView(course));
      }
    } catch {
      router.push(`/course-landing/${slug}`);
    }
  };

  useEffect(() => {
    if (!signedInUser?.id) {
      router.push(`/course-landing/${slug}`);
    } else {
      actionBasedOnEnrollState();
    }
  }, [topicId, course, signedInUser?.id]);
};

export default useCourseGuard;
