import { Model, Types } from "mongoose";
import { ICourseTopic } from "../courseTopic";
import { ICourse } from "../course";

export interface IEnrollState {
  id?: string;
  _id?: string;
  course: Types.ObjectId | ICourse | string;
  user: string;
  currentTopic: Types.ObjectId | ICourseTopic | string;
  finishedTopics: string[];
  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
}

export type IEnrollStateModel = Model<IEnrollState, Record<string, unknown>>;
