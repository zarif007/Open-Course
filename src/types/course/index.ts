import { Model, Types } from "mongoose";
import { ICourseTopic } from "../courseTopic";
import { IUser } from "../user";

export interface ICourse {
  id?: string;
  _id?: string;
  title: string;
  type: "gn" | "org";
  version: number;
  enabled: boolean;
  creator: IUser | Types.ObjectId;
  contributors: IUser[] | Types.ObjectId[];
  enrolledUsers: IUser[] | Types.ObjectId[];
  categories: string[] | [];
  levels: string[] | [];
  languages: string[] | [];
  description: string;
  banner?: string;
  slug: string;
  topics: ICourseTopic[] | Types.ObjectId[];
  tags: string[];
  status: string;
  ratings?:
    | {
        user: string;
        rating: number;
      }[]
    | [];
  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
}

export type ICourseModel = Model<ICourse, Record<string, unknown>>;
