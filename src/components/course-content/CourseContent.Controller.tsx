import React, { useEffect, useState } from "react";
import CourseContent from "./CourseContent";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { useDispatch } from "react-redux";
import {
  setCurrentCourseTopicForView,
  setEnrollState,
} from "@/redux/features/course-view-slice";
import { IEnrollState } from "@/types/enrollState";
import axios from "axios";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { toast } from "../ui/Toast";
import { ICourseTopic } from "@/types/courseTopic";
import sortCompareBasedOnSortID from "@/utils/sortCompareBasedOnSortID";

const CourseContentController = () => {
  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const course = useAppSelector(
    (state) => state.courseViewReducer.value.course
  );

  const enrollState = useAppSelector(
    (state) => state.courseViewReducer.value.enrollState
  );

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isLastTopic, setIsLastTopic] = useState<boolean>(false);

  useEffect(() => {
    if (!course || !currentCourseTopic.sortID) return;
    const courseTopics = course.topics as ICourseTopic[];
    const lastTopic = courseTopics[courseTopics.length - 1];
    setIsLastTopic(lastTopic.sortID === currentCourseTopic.sortID);
  }, [course, currentCourseTopic]);

  // Incase the next topic based on sequence is deleted
  const findTheNextTopic = (potentialSortID: number): ICourseTopic => {
    const courseTopics = course.topics as ICourseTopic[];
    for (let i = 0; i < courseTopics.length; i++) {
      const topic = courseTopics[i];
      if (topic.sortID! >= potentialSortID) {
        return topic;
      }
    }

    return courseTopics[0];
  };

  const updateEnrollState = async (nextTopic: ICourseTopic, fetch: boolean) => {
    if (
      !enrollState.finishedTopics.includes(nextTopic.topicID.toString()) ||
      fetch
    ) {
      const currentCourseTopicId = currentCourseTopic.topicID as number;

      const state: IEnrollState = {
        ...enrollState,
        currentTopic: nextTopic.id as string,
        finishedTopics: enrollState.finishedTopics.includes(
          currentCourseTopicId.toString()
        )
          ? enrollState.finishedTopics
          : [...enrollState.finishedTopics, currentCourseTopicId.toString()],
      };

      const updatedEnrollState = await axios.put(
        `${nextApiEndPoint}/enrollState`,
        state
      );

      dispatch(setEnrollState(updatedEnrollState.data.data));
    }

    dispatch(setCurrentCourseTopicForView(nextTopic));
  };

  const handleNextButton = async () => {
    if (isLoading || !signedInUser?.id || !course || !currentCourseTopic.id)
      return;

    setIsLoading(true);

    try {
      const nextTopic = findTheNextTopic(
        (currentCourseTopic.sortID as number) + 1
      );

      await updateEnrollState(nextTopic, false);

      router.push(`/course/${course.slug}?topicId=${nextTopic.topicID}`);
    } catch (error) {
      toast({
        title: "Error",
        message: `Something went wrong`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoneButton = async () => {
    if (isLoading || !signedInUser?.id || !course || !currentCourseTopic.id)
      return;

    setIsLoading(true);

    try {
      // Check the first topic in the array
      const nextTopic = findTheNextTopic(1);

      await updateEnrollState(nextTopic, true);

      toast({
        title: "Success",
        message: `Course completed successfully`,
        type: "success",
      });
      router.push(`/course-completion/${course.slug}`);
    } catch (error) {
      toast({
        title: "Error",
        message: `Something went wrong, try again`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <CourseContent courseTopic={currentCourseTopic} />
      <div className="mt-[40px] flex justify-end">
        {!isLastTopic ? (
          <Button
            className="px-12"
            onClick={handleNextButton}
            isLoading={isLoading}
          >
            Next
          </Button>
        ) : (
          <Button
            className="px-12"
            onClick={handleDoneButton}
            isLoading={isLoading}
          >
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseContentController;
