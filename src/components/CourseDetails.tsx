"use cleit";

import React from "react";
import LargeHeading from "./ui/LargeHeading";
import { useAppSelector } from "@/redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import Paragraph from "./ui/Paragraph";
import SelectedTopics from "./SelectedTopics";
import { formatSelectedLevels } from "@/utils/formatSelectedLevels";
import { IUser } from "@/types/user";
import ContentLogoDurationBar from "@/components/ContentLogoDuration.Bar";
import { ICourse } from "@/types/course";

const CourseDetails = ({ course }: { course: ICourse }) => {
  const creator = course.creator as IUser;

  return (
    <div className="flex flex-col justify-start p-3 md:p-6">
      <LargeHeading className="text-center underline decoration-rose-500 decoration-4">
        {course.title}
      </LargeHeading>
      <div className="flex space-x-2 items-center mx-auto">
        <Paragraph className="font-bold text-md">By</Paragraph>
        <Avatar className="h-10 w-10 rounded-full border-2 p-[2px] border-rose-500">
          <AvatarImage
            className="rounded-full"
            src={creator.attributes.image_url}
          />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        <Paragraph className="font-bold text-md">
          {creator.attributes.first_name}
        </Paragraph>
      </div>

      <div className="flex flex-wrap mx-auto">
        <div className="m-1">
          <label className="font-semibold">Categories</label>
          <SelectedTopics selectedTopics={course.categories} mode="view" />
        </div>
        <div className="m-1">
          <label className="font-semibold">Levels</label>
          <SelectedTopics
            selectedTopics={formatSelectedLevels(course.levels)}
            mode="view"
          />
        </div>
        <div className="m-1">
          <label className="font-semibold">languages</label>
          <SelectedTopics selectedTopics={course.languages} mode="view" />
        </div>
      </div>
      <div className="md:w-[50%] mx-auto">
        <ContentLogoDurationBar topics={course.topics} withDuration={false} />
      </div>
    </div>
  );
};

export default CourseDetails;
