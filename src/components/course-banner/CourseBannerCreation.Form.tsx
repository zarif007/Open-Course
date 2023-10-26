import { AppDispatch, useAppSelector } from "@/redux/store";
import generateBannerFromCourse from "@/utils/generateBannerFromCourse";
import React, { useEffect, useState } from "react";
import BlurredImage from "../ui/BlurredImage";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useDispatch } from "react-redux";
import { setCourseForCreation } from "@/redux/features/course-creation-slice";
import { toast } from "../ui/Toast";

const CourseBannerCreationForm = () => {
  const course = useAppSelector(
    (state) => state.courseCreationReducer.value.course
  );
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );
  const [banner, setBanner] = useState<string>(
    generateBannerFromCourse(course, signedInUser?.name ?? "")
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleSetBanner = () => {
    dispatch(
      setCourseForCreation({
        ...course,
        banner,
      })
    );
    toast({
      title: "Banner Added",
      type: "success",
      message: "Banner Added",
    });
  };

  return (
    <div className="mx-4 md:mx-8">
      <div className="mx-auto h-full w-full md:h-[70%] md:w-[70%]">
        <label htmlFor="text" className="font-bold">
          Set Banner
        </label>
        <div className="flex items-center space-x-2 mb-6 mt-2">
          <Input
            defaultValue={banner}
            className="py-6"
            onChange={(e) => setBanner(e.target.value)}
          />
          <Button className="py-6" onClick={handleSetBanner}>
            Set
          </Button>
        </div>
        <BlurredImage
          src={banner}
          alt="banner"
          dimension="h-full w-full md:h-[70%] md:w-[70%]"
          className=" object-cover object-center rounded"
        />
      </div>
    </div>
  );
};

export default CourseBannerCreationForm;
