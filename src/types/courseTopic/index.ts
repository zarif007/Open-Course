import { Schema } from 'mongoose';
import { Model } from 'mongoose';
import { IUser } from '../user';

export interface ICourseTopic {
  id?: number | string;
  _id?: string;
  topicID: number;
  sortID?: number;
  views?: number;
  creator: Schema.Types.ObjectId | string | IUser;
  versions: {} & (
    | {
        type: 'free_source_content';
        data: IEmbedContent;
      }
    | {
        type: 'doc_content';
        data: IDocContent;
      }
  )[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  _v?: number;
}

export interface IEmbedContent {
  title: string;
  url: string;
  source?: string;
  description?: string;
  duration: number;
}

export interface IDocContent {
  title: string;
  content: string;
  duration?: number;
}

export type ICourseTopicModel = Model<ICourseTopic, Record<string, unknown>>;
