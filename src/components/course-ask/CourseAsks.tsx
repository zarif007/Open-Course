"use client";

import { trpc } from "@/app/_trpc/client";
import React from "react";
import Ask from "./Ask";
import CreateAskDialog from "./CreateAsk.Dialog";

const CourseAsks = () => {
  const getData = trpc.getCourseAsks.useQuery({});
  console.log(getData.data);
  return (
    <div>
      <div className="flex justify-end mb-2">
        <CreateAskDialog />
      </div>
      <Ask />
    </div>
  );
};

export default CourseAsks;
