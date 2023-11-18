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
        const courseTopics = course.topics as ICourseTopic[];
        if (
          !topicId ||
          !canBeParsedToInt(topicId) ||
          !isValid(parseInt(topicId), enrollState)
        ) {
          const currentTopic = enrollState.currentTopic as ICourseTopic;
          router.push(`/course/${slug}?topicId=${currentTopic.topicID}`);
          dispatch(
            setCurrentCourseTopicForView(
              courseTopics[currentTopic.topicID! - 1]
            )
          );
        } else {
          dispatch(
            setCurrentCourseTopicForView(courseTopics[parseInt(topicId) - 1])
          );
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
