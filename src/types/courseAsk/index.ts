import { Model } from "mongoose";
import { IUser } from "../user";
import { ICourse } from "../course";
import { Types } from "mongoose";

export interface ICourseAsk {
  id?: number | string;
  _id?: string;
  author: IUser | string | Types.ObjectId;
  course: ICourse | string | Types.ObjectId;
  topic: ICourse | string | Types.ObjectId;
  title: string;
  question: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  _v?: number;
}

export type ICourseAskModel = Model<ICourseAsk, Record<string, unknown>>;
