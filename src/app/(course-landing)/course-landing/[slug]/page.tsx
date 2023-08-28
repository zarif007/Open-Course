import CourseLandingPage from "@/components/CourseLanding.Page";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import axios from "axios";
import React from "react";

interface PageParams {
  params: {
    slug: string;
  };
}

const CourseLanding = async ({ params }: PageParams) => {
  const { data } = await axios.get(
    `${v1MainEndpoint}/course/bySlug/${params.slug}`
  );
  const course = data.data;
  return <CourseLandingPage course={course} />;
};

export default CourseLanding;
