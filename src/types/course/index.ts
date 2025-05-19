import { Model, Types } from 'mongoose';
import { ICourseTopic } from '../courseTopic';
import { IUser } from '../user';
import { ICheckPoint } from '../checkPoint';

export interface ICourse {
  id?: string;
  _id?: string;
  title: string;
  type: 'gn' | 'org';
  version: number;
  enabled: boolean;
  creator: IUser | Types.ObjectId | string;
  contributors: IUser[] | Types.ObjectId[] | string[];
  enrolledUsers: IUser[] | string[];
  categories: string[] | [];
  levels: string[] | [];
  languages: string[] | [];
  description: string;
  banner: string;
  slug: string;
  topics: ICourseTopic[] | Types.ObjectId[] | string[];
  tags: string[];
  status: string;
  checkPoints: ICheckPoint[] | [];
  coursePrivacy: 'public' | 'private';
  topicPrivacy: 'open' | 'locked';
  isAIGenerated?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
}

export type ICourseModel = Model<ICourse, Record<string, unknown>>;
