import {
  ICourseTopic,
  IDocContent,
  IFreeSourceContent,
} from "@/types/courseTopic";

const courseDurationCalculator = (topics: ICourseTopic[]): string => {
  let duration = 0;
  topics.map((topic) => {
    const topicData: IFreeSourceContent | IDocContent =
      topic.versions[topic.versions.length - 1].data;
    duration += topicData.duration ?? 0;
  });
  const inMin = parseInt((duration % 60).toFixed(0));
  const inHr = parseInt((duration / 60).toFixed(0));
  return `${inHr ? `${inHr}h ` : ""}${inMin}m`;
};

export default courseDurationCalculator;
