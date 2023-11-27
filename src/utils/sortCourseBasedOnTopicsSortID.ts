import { ICourse } from "@/types/course";
import { ICourseTopic } from "@/types/courseTopic";
import sortCompareBasedOnSortID from "./sortCompareBasedOnSortID";

const sortCourseBasedOnTopicsSortID = (course: ICourse): ICourse => {
  const courseTopics = course.topics as ICourseTopic[];

  return {
    ...course,
    topics: [...courseTopics].sort(sortCompareBasedOnSortID),
  };
};

export default sortCourseBasedOnTopicsSortID;
