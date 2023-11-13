import { Model } from "mongoose";
import { IUser } from "../user";
import { Types } from "mongoose";
import { ICourseTopic } from "../courseTopic";

export interface ICourseAsk {
  id?: number | string;
  _id?: string;
  author: IUser | string | Types.ObjectId;
  topic: ICourseTopic | string | Types.ObjectId;
  title: string;
  question: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  upVote: IUser[] | string[] | Types.ObjectId[];
  downVote: IUser[] | string[] | Types.ObjectId[];
  _v?: number;
}

export type ICourseAskModel = Model<ICourseAsk, Record<string, unknown>>;
