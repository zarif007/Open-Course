import React, { useState } from "react";
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
import { useSession } from "next-auth/react";

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

  const router = useRouter();

  const { data: session } = useSession();

  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateEnrollState = async (nextTopicId: number, fetch: boolean) => {
    const courseTopics = course.topics as ICourseTopic[];
    dispatch(setCurrentCourseTopicForView(courseTopics[nextTopicId - 1]));

    if (!enrollState.finishedTopics.includes(nextTopicId.toString()) || fetch) {
      const { data } = await axios.get(
        `${nextApiEndPoint}/enrollState?user=${session?.user?.email}&course=${course.id}`
      );

      const enrollState = data.data as IEnrollState;

      const currentCourseTopicId = currentCourseTopic.topicID as number;

      const state: IEnrollState = {
        ...enrollState,
        currentTopic: courseTopics[nextTopicId - 1].id as string,
        finishedTopics: enrollState.finishedTopics.includes(
          currentCourseTopicId.toString()
        )
          ? enrollState.finishedTopics
          : [...enrollState.finishedTopics, currentCourseTopicId.toString()],
      };

      await axios.put(`${nextApiEndPoint}/enrollState`, state);

      const updatedEnrollState = await axios.put(
        `${nextApiEndPoint}/enrollState`,
        state
      );

      dispatch(setEnrollState(updatedEnrollState.data.data));
    }
  };

  const handleNextButton = async () => {
    if (isLoading || !session?.user || !course || !currentCourseTopic.id)
      return;

    setIsLoading(true);

    try {
      const nextTopicId = (currentCourseTopic.topicID as number) + 1;

      await updateEnrollState(nextTopicId, false);

      router.push(`/course/${course.slug}?topicId=${nextTopicId}`);
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
    if (isLoading || !session?.user || !course || !currentCourseTopic.id)
      return;

    setIsLoading(true);

    try {
      const nextTopicId = 1;

      await updateEnrollState(nextTopicId, true);

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
        {currentCourseTopic.topicID &&
        currentCourseTopic.topicID < course.topics.length ? (
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
