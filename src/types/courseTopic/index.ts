import { Model } from "mongoose";

export interface ICourseTopic {
  id?: number | string;
  _id?: string;
  topicID: number;
  sortID?: number;
  views?: number;
  // versions: {
  //   type: "free_source_content" | "doc_content" | "quiz";
  //   data: IFreeSourceContent;
  // }[];
  versions: {} & (
    | {
        type: "free_source_content";
        data: IFreeSourceContent;
      }
    | {
        type: "doc_content";
        data: IDocContent;
      }
  )[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  _v?: number;
}

export interface IFreeSourceContent {
  title: string;
  url: string;
  source: string;
  description: string;
  duration: number;
}

export interface IDocContent {
  title: string;
  content: string;
  duration?: number;
}

export type ICourseTopicModel = Model<ICourseTopic, Record<string, unknown>>;
