import { AppDispatch, useAppSelector } from "@/redux/store";
import generateBannerFromCourse from "@/utils/generateBannerFromCourse";
import React, { useEffect, useState } from "react";
import BlurredImage from "../ui/BlurredImage";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useDispatch } from "react-redux";
import { setCourseForCreation } from "@/redux/features/course-creation-slice";
import { toast } from "../ui/Toast";
import { setCourseForUpdate } from "@/redux/features/course-update-slice";

const CourseBannerCreationForm = ({ mode }: { mode: "creation" | "edit" }) => {
  const course = useAppSelector((state) =>
    mode === "creation"
      ? state.courseCreationReducer.value.course
      : state.courseUpdateReducer.value.course
  );
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );
  const [banner, setBanner] = useState<string>("");

  useEffect(() => {
    if (!course.title) return;
    setBanner(
      !course.banner || course.banner === ""
        ? generateBannerFromCourse(course, signedInUser?.name ?? "")
        : course.banner
    );
  }, [course]);

  const dispatch = useDispatch<AppDispatch>();

  const handleSetBanner = () => {
    const updated = {
      ...course,
      banner,
    };
    dispatch(
      mode === "creation"
        ? setCourseForCreation(updated)
        : setCourseForUpdate(updated)
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
        {banner !== "" && (
          <BlurredImage
            src={banner}
            alt="banner"
            dimension="h-full w-full md:h-[70%] md:w-[70%]"
            className=" object-cover object-center rounded mx-auto"
          />
        )}
      </div>
    </div>
  );
};

export default CourseBannerCreationForm;
