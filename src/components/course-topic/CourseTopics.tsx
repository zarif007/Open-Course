"use client";

import React, { useEffect, useState } from "react";
import Paragraph from "../ui/Paragraph";
import { ICourseTopic } from "@/types/courseTopic";
import CourseTopic from "./CourseTopic";
import { useAppSelector } from "@/redux/store";
import { Button } from "../ui/Button";
import { BiSolidFlagCheckered } from "react-icons/bi";
import CheckPoints from "./CheckPoints";
import { Input } from "../ui/Input";

interface IHiddenRanges {
  [key: number]: { start: number; end: number; isHidden: boolean };
}

const CourseTopics = ({ mode }: { mode: "creation" | "edit" | "view" }) => {
  const [courseTopics, setCourseTopics] = useState<ICourseTopic[] | []>([]);
  const [isAddCheckPointButtonClicked, setIsAddCheckPointButtonClicked] =
    useState<boolean>(false);

  const [hiddenTopicsRanges, setHiddenTopicsRanges] = useState<IHiddenRanges>(
    []
  );

  const course = useAppSelector((state) =>
    mode === "view"
      ? state.courseViewReducer.value.course
      : mode === "creation"
      ? state.courseCreationReducer.value.course
      : state.courseUpdateReducer.value.course
  );

  const handleSettingHiddenRanges = (checkPointID: number) => {
    const updated: IHiddenRanges = {
      ...hiddenTopicsRanges,
      [checkPointID]: {
        ...hiddenTopicsRanges[checkPointID],
        isHidden: !hiddenTopicsRanges[checkPointID].isHidden,
      },
    };
    setHiddenTopicsRanges(updated);
  };

  const fallsUnderHiddenRange = (topicID: number): boolean => {
    let flag = false;
    Object.entries(hiddenTopicsRanges).map((range) => {
      if (
        range[1].start <= topicID &&
        topicID <= range[1].end &&
        range[1].isHidden
      ) {
        flag = true;
        return;
      }
    });
    return flag;
  };

  useEffect(() => {
    setCourseTopics(course.topics as ICourseTopic[]);

    let ranges: IHiddenRanges = {};
    let cps = course.checkPoints;

    if (!cps) return;

    cps = [...cps].sort((obj1, obj2) => obj1.topicID - obj2.topicID);

    for (let i = 0; i < cps.length; i++) {
      ranges = {
        ...ranges,
        [cps[i].checkPointID]: {
          start: cps[i].topicID,
          end:
            cps.length - 1 === i
              ? course.topics.length
              : cps[i + 1].topicID - 1,
          isHidden: false,
        },
      };
    }
    setHiddenTopicsRanges(ranges);
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

  return (
    <React.Fragment>
      <Paragraph className="mx-2 font-bold">Course Topics</Paragraph>
      <div className="m-2">
        {mode === "view" ? (
          <Input
            placeholder="Search Topic"
            onChange={(e) => handleFilterTopics(e)}
          />
        ) : (
          <Button
            onClick={() =>
              setIsAddCheckPointButtonClicked(!isAddCheckPointButtonClicked)
            }
            className="w-full flex space-x-2 focus:ring-0"
          >
            <p>{isAddCheckPointButtonClicked ? "Done" : "Add Checkpoints"}</p>
            <BiSolidFlagCheckered />
          </Button>
        )}
      </div>
      {courseTopics.map((courseTopic: ICourseTopic, index: number) => {
        return (
          <div key={index}>
            <div className="mx-2">
              <CheckPoints
                topicID={courseTopic.topicID as number}
                checkPoints={course.checkPoints}
                mode={mode}
                isAddCheckPointButtonClicked={isAddCheckPointButtonClicked}
                handleSettingHiddenRanges={handleSettingHiddenRanges}
              />
            </div>
            {!fallsUnderHiddenRange(courseTopic.topicID as number) && (
              <CourseTopic
                index={index}
                courseTopic={courseTopic}
                mode={mode}
              />
            )}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default CourseTopics;
