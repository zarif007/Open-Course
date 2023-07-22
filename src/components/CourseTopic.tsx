'use client'
import React from "react";
import Paragraph from "./ui/Paragraph";
import getOGImage from "@/utils/getOGImages";

const CourseTopic = ({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) => {

    
  return (
    <section className="m-2 border-2 border-slate-300 dark:border-gray-800 hover:border-blue-700 hover:dark:border-blue-700  bg-slate-100 dark:bg-gray-950 px-4 md:px-6 py-2 rounded cursor-pointer">
      <Paragraph className="truncate-text-1-line font-bold">
        {`${index}. `} <span className=" ">{title}</span>{" "}
      </Paragraph>
      <Paragraph size="sm">{description}</Paragraph>
    </section>
  );
};

export default CourseTopic;
