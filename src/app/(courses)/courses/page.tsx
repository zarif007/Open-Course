import CourseCard from "@/components/Course.Card";
import { ICourse } from "@/types/course";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import axios from "axios";
import React from "react";

const Courses = async () => {
  const { data } = await axios.get(`${v1MainEndpoint}/course`);
  const courses = data.data;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {courses.map((course: ICourse) => {
        return <CourseCard key={course.id} course={course} />;
      })}
    </div>
  );
};

export default Courses;
