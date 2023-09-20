import { Model } from "mongoose";

export interface ICourseTopic {
  id?: number | string;
  _id?: string;
  topicID?: number;
  versions: [
    {
      title: string;
      url: string;
      description?: string;
      duration: number;
    }
  ];
  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
}

export type ICourseTopicModel = Model<ICourseTopic, Record<string, unknown>>;
