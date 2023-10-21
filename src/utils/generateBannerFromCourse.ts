import { ICourse } from "@/types/course";
import { IUser } from "@/types/user";

const generateBannerFromCourse = (course: ICourse) => {
  const creator = course?.creator as IUser;

  return `https://open-course.vercel.app/api/generateBanner?courseTitle=${
    course?.title
  }&theme=dark&slug=${course.slug}&
      &topics=${course?.categories ? course?.categories.join("  ") : ""}
      &creator=${creator.name}`;
};

export default generateBannerFromCourse;
