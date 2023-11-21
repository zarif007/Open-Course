"use cleit";

import React from "react";
import LargeHeading from "../ui/LargeHeading";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import Paragraph from "../ui/Paragraph";
import SelectedTopics from "./SelectedTopics";
import { formatSelectedLevels } from "@/utils/formatSelectedLevels";
import { IUser } from "@/types/user";
import ContentLogos from "@/components/course-content/ContentLogos";
import { ICourse } from "@/types/course";
import { ICourseTopic } from "@/types/courseTopic";
import { useSession } from "next-auth/react";
import { Button } from "../ui/Button";
import { FcSettings } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setCourseForUpdate } from "@/redux/features/course-update-slice";
import { useRouter } from "next/navigation";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import calculateAvgRating from "@/utils/calculateAvgRating";
import { PiShootingStarDuotone } from "react-icons/pi";
import BlurredImage from "../ui/BlurredImage";

const CourseDetails = ({ course }: { course: ICourse }) => {
  const { data: session } = useSession();

  const creator = course.creator as IUser;

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const handleSettings = () => {
    dispatch(setCourseForUpdate(course));
    router.push(`/course-update`);
  };

  return (
    <div className="flex flex-col justify-start p-3 md:p-6">
      <BlurredImage
        src={course.banner}
        className=""
        alt="banner"
        dimension="w-full h-48"
      />
      <div
        className={`rounded mx-auto flex items-center space-x-2 ${
          course.coursePrivacy === "public" ? "bg-blue-500" : "bg-violet-500"
        } text-sm font-semibold px-2 py-1`}
      >
        {course.coursePrivacy === "public" ? (
          <AiOutlineUnlock />
        ) : (
          <AiOutlineLock />
        )}
        <p>{course.coursePrivacy}</p>
      </div>
      <LargeHeading className="text-center underline decoration-rose-500 decoration-4">
        {course.title}
      </LargeHeading>
      <div className="flex space-x-2 items-center mx-auto">
        <Paragraph className="font-bold text-md">By</Paragraph>
        <Avatar className="h-10 w-10 rounded-full border-2 p-[2px] border-rose-500 my-3">
          <AvatarImage className="rounded-full" src={creator.image} />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        <Paragraph className="font-bold text-md">{creator.name}</Paragraph>
      </div>
      {creator.email === session?.user?.email && (
        <Button
          onClick={handleSettings}
          className="w-fit mx-auto flex space-x-1"
        >
          <FcSettings />
          <p>Settings</p>
        </Button>
      )}
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
        <ContentLogos
          topics={course.topics as ICourseTopic[]}
          withDuration={false}
        />
      </div>
      <div className="flex items-center justify-center mt-4 space-x-2">
        <p className="font-bold text-md ">
          Reviews {calculateAvgRating(course.reviews ?? [])}(
          {course?.reviews?.length ?? 0})
        </p>
        <PiShootingStarDuotone className="w-6 h-6" />
      </div>
    </div>
  );
};

export default CourseDetails;
