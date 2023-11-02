"use client";

import React, { useEffect, useState } from "react";
import Paragraph from "../ui/Paragraph";
import { ICourseTopic } from "@/types/courseTopic";
import CourseTopic from "./CourseTopic";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  setCourseForCreation,
  setCurrentCourseTopicForCreation,
} from "@/redux/features/course-creation-slice";
import { setCurrentCourseTopicForView } from "@/redux/features/course-view-slice";
import { useRouter } from "next/navigation";
import { Input } from "../ui/Input";
import {
  setCourseForUpdate,
  setCurrentCourseTopicForUpdate,
} from "@/redux/features/course-update-slice";
import { Button } from "../ui/Button";
import { BiSolidFlagCheckered } from "react-icons/bi";
import { ICheckPoint } from "@/types/checkPoint";
import { MdCancel } from "react-icons/md";
import CheckPoints from "./CheckPoints";

const CourseTopics = ({ mode }: { mode: "creation" | "edit" | "view" }) => {
  const [courseTopics, setCourseTopics] = useState<ICourseTopic[] | []>([]);
  const [checkPointClicked, setCheckPointClicked] = useState<boolean>(false);
  const [checkPointName, setCheckPointName] = useState<string>("");

  const course = useAppSelector((state) =>
    mode === "view"
      ? state.courseViewReducer.value.course
      : mode === "creation"
      ? state.courseCreationReducer.value.course
      : state.courseUpdateReducer.value.course
  );

  const enrollState = useAppSelector(
    (state) => state.courseViewReducer.value.enrollState
  );

  const currentCourseTopic = useAppSelector((state) =>
    mode === "creation"
      ? state.courseCreationReducer.value.currentCourseTopic
      : state.courseUpdateReducer.value.currentCourseTopic
  );

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const redirectToCurrentCourseTopic = (courseTopic: ICourseTopic) => {
    if (!isValidTopic(courseTopic)) return;
    router.push(`/course/${course.slug}?topicId=${courseTopic.topicID}`);
    dispatch(setCurrentCourseTopicForView(courseTopic));
  };

  const isValidTopic = (courseTopic: ICourseTopic): boolean => {
    const topicId = courseTopic.topicID as number;
    return enrollState.finishedTopics.includes(topicId.toString());
  };

  useEffect(() => {
    setCourseTopics(course.topics as ICourseTopic[]);
  }, [course]);

  const handleFilterTopics = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allTopics = course.topics as ICourseTopic[];
    if (e.target.value === "") {
      setCourseTopics(allTopics);
      return;
    }
    setCourseTopics(
      allTopics.filter((topic) =>
        topic.versions[topic.versions.length - 1].title
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleAddCheckPoint = () => {
    const checkPoint = {
      checkPointID: course.checkPoints ? course.checkPoints.length + 1 : 1,
      topicID:
        !currentCourseTopic.topicID || currentCourseTopic.topicID <= 0
          ? 1
          : currentCourseTopic.topicID,
      name: checkPointName,
    };
    const updated = {
      ...course,
      checkPoints: [...(course.checkPoints ?? []), checkPoint],
    };
    dispatch(
      mode === "creation"
        ? setCourseForCreation(updated)
        : setCourseForUpdate(updated)
    );
  };

  const handleRemoveCheckPoint = (checkPointID: number) => {
    const updated = {
      ...course,
      checkPoints: course.checkPoints.filter(
        (cp) => cp.checkPointID !== checkPointID
      ),
    };
    dispatch(
      mode === "creation"
        ? setCourseForCreation(updated)
        : setCourseForUpdate(updated)
    );
  };

  return (
    <React.Fragment>
      <Paragraph className="mx-2 font-bold">Course Topics</Paragraph>
      <div className="mx-2 my-1">
        {mode === "view" ? (
          <Input
            className=""
            placeholder="Search Topic"
            onChange={(e) => handleFilterTopics(e)}
          />
        ) : (
          <Button
            onClick={() => setCheckPointClicked(!checkPointClicked)}
            className="w-full flex space-x-2 focus:ring-0"
          >
            <p>Add Checkpoints</p>
            <BiSolidFlagCheckered />
          </Button>
        )}
        {checkPointClicked && (
          <div className="flex items-center space-x-1 my-2">
            <Input
              placeholder="Checkpoint Name"
              defaultValue={checkPointName}
              onChange={(e) => setCheckPointName(e.target.value)}
            />
            <Button className="focus:ring-0" onClick={handleAddCheckPoint}>
              Set
            </Button>
          </div>
        )}
      </div>
      {courseTopics.map((courseTopic: ICourseTopic, index: number) => {
        return (
          <div
            key={index}
            onClick={() =>
              mode === "view"
                ? redirectToCurrentCourseTopic(courseTopic)
                : dispatch(
                    mode === "creation"
                      ? setCurrentCourseTopicForCreation(courseTopic)
                      : setCurrentCourseTopicForUpdate(courseTopic)
                  )
            }
          >
            <CheckPoints
              topicID={courseTopic.topicID as number}
              checkPoints={course.checkPoints}
              handleRemoveCheckPoint={handleRemoveCheckPoint}
              mode={mode}
            />
            <CourseTopic index={index} courseTopic={courseTopic} mode={mode} />
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default CourseTopics;
