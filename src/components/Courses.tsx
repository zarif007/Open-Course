"use client";

import React from "react";
import LargeHeading from "./ui/LargeHeading";
import Course from "./Course";
import SwiperComp from "./ui/SwiperComp";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import { ICourse } from "@/types/course";

const Courses = () => {
  const { data: courses } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const { data } = await axios.get(`${v1MainEndpoint}/course`);

      return data.data.map((course: ICourse, index: number) => {
        return <Course course={course} key={index} />;
      });
    },
  });

  return (
    <main className="relative min-h-screen flex flex-col overflow-x-hidden w-full max-w-7xl mx-auto">
      <LargeHeading className="underline decoration-rose-500">
        Courses
      </LargeHeading>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4"></div>

        <SwiperComp comps={courses} slidesPerView={0} />
      </div>
    </main>
  );
};

export default Courses;
