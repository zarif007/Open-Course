import { Model, Types } from "mongoose";
import { IUser } from "../user";

export interface IDiscuss {
  id?: number | string;
  _id?: string;
  sender: IUser | string;
  comment: string;
  replies: IDiscuss[] | [] | Types.ObjectId[];
  reactions: string[] | [];
  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
}

export type IDiscussModel = Model<IDiscuss, Record<string, unknown>>;
