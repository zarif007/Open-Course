import { Model } from "mongoose";

export interface ICourseTopic {
  id?: number | string;
  _id?: string;
  topicID?: number;
  type?: "content-from-internet" | "text" | "upload";
  views?: number;
  versions: [
    // Type will differ from here
    {
      title: string;
      url: string;
      source?: string;
      description?: string;
      duration: number;
    }
  ];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  _v?: number;
}

export type ICourseTopicModel = Model<ICourseTopic, Record<string, unknown>>;
