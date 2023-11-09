import { Model, Types } from "mongoose";
import { ICourseTopic } from "../courseTopic";
import { ICourse } from "../course";
import { IUser } from "../user";

export interface IEnrollState {
  id?: string;
  _id?: string;
  course: Types.ObjectId | ICourse | string;
  user: string | Types.ObjectId | IUser;
  currentTopic: Types.ObjectId | ICourseTopic | string;
  finishedTopics: string[];
  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
}

export type IEnrollStateModel = Model<IEnrollState, Record<string, unknown>>;
