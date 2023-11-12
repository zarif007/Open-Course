"use client";

import { trpc } from "@/app/_trpc/client";
import React from "react";
import Ask from "./Ask";

const CourseAsks = () => {
  const getData = trpc.getCourseAsks.useQuery({});
  console.log(getData.data);
  return (
    <div>
      <Ask />
    </div>
  );
};

export default CourseAsks;
