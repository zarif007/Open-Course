import { Model, Types } from 'mongoose';
import { IUser } from '../user';
import { ICourseTopic } from '../courseTopic';

export interface IDiscussion {
  id?: number | string;
  _id?: string;
  sender: IUser | string;
  topicId: ICourseTopic | string;
  version: number;
  comment: string;
  parentId: string;
  replies:
    | IDiscussion[]
    | []
    | Types.ObjectId[]
    | (Types.ObjectId | IDiscussion)[];
  reactions: {
    [key: string]: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
}

export type IDiscussionModel = Model<IDiscussion, Record<string, unknown>>;
