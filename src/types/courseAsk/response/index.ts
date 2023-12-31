import { ICourseTopic } from '@/types/courseTopic';
import { IUser } from '@/types/user';
import { Model, Types } from 'mongoose';

export interface IAskResponse {
  id?: number | string;
  _id?: string;
  questionId: string;
  topic: ICourseTopic | string | Types.ObjectId;
  version: number;
  author: IUser | string | Types.ObjectId;
  answer: string;
  upVote: IUser[] | string[] | Types.ObjectId[];
  downVote: IUser[] | string[] | Types.ObjectId[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  _v?: number;
}

export type IAskResponseModel = Model<IAskResponse, Record<string, unknown>>;
