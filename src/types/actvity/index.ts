import { Model, Types } from "mongoose";
import { IUser } from "../user";

export interface IActivity {
  id?: number | string;
  _id?: string;
  user: IUser | Types.ObjectId | string;
  date: Date | string;
  link: string;
  text: string;
  type: "commented" | "created" | "enrolled" | "completed";
  createdAt?: Date | string;
  updatedAt?: Date | string;
  _v?: number;
}

export type IActivityModel = Model<IActivity, Record<string, unknown>>;
