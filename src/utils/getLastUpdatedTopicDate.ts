import { ICourseTopic } from "@/types/courseTopic";

const getLastUpdatedTopicDate = (courseTopics: ICourseTopic[]): Date | null => {
  const sortedData = courseTopics
    .slice()
    .sort(
      (a: ICourseTopic, b: ICourseTopic) =>
        new Date(b.updatedAt ?? "").getTime() -
        new Date(a.updatedAt ?? "").getTime()
    );

  // The first element in the sorted array has the latest updatedAt date
  return sortedData[0].updatedAt ?? null;
};

export default getLastUpdatedTopicDate;
