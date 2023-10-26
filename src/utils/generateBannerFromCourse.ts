import { ICourse } from "@/types/course";
import { IUser } from "@/types/user";

const generateBannerFromCourse = (course: ICourse, creator: string) => {
  return `/api/generateBanner?courseTitle=${course?.title}&theme=dark&slug=${
    course.slug
  }&
      &topics=${course?.categories ? course?.categories.join("  ") : ""}
      &creator=${creator}`;
};

export default generateBannerFromCourse;
