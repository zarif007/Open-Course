import { ICourseTopic } from "../courseTopic";
import { IUser } from "../user";

export interface ICourse {
  id?: string;
  _id?: string;
  title: string;
  type: "gn" | "org";
  version: number;
  enabled: boolean;
  creator: IUser | string;
  contributors: IUser[] | [];
  enrolledUsers: IUser[] | [];
  categories: string[];
  levels: string[];
  languages: string[];
  description: string;
  banner?: string;
  topics: ICourseTopic[];
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
}
