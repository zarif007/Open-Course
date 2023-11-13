"use client";

import { trpc } from "@/app/_trpc/client";
import React from "react";
import Ask from "./Ask";
import CreateAskDialog from "./CreateAsk.Dialog";
import { useAppSelector } from "@/redux/store";
import { ICourseAsk } from "@/types/courseAsk";

const CourseAsks = () => {
  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const { data: asks, isLoading } = trpc.getCourseAsks.useQuery({
    topicId: currentCourseTopic.id as string,
  });

  return (
    <div>
      <div className="flex justify-end mb-2">
        <CreateAskDialog />
      </div>
      {isLoading ? (
        <>Loading....</>
      ) : (
        <div className="flex flex-col space-y-2">
          {asks?.map((ask: ICourseAsk) => (
            <Ask key={ask.id} ask={ask} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseAsks;
