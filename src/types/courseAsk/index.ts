import { Model } from 'mongoose';
import { IUser } from '../user';
import { Types } from 'mongoose';
import { ICourseTopic } from '../courseTopic';
import { IAskResponse } from './response';

export interface ICourseAsk {
  id?: number | string;
  _id?: string;
  author: IUser | string | Types.ObjectId;
  topic: ICourseTopic | string | Types.ObjectId;
  version: number;
  title: string;
  slug: string;
  question: string;
  responses: IAskResponse[] | string[] | Types.ObjectId[];
  theAnswers: string[] | Types.ObjectId[];
  tags: string[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  upVote: IUser[] | string[] | Types.ObjectId[];
  downVote: IUser[] | string[] | Types.ObjectId[];
  _v?: number;
}

export type ICourseAskModel = Model<ICourseAsk, Record<string, unknown>>;
