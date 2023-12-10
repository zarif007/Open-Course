import { Model, Schema } from 'mongoose';
import { IDocContent, IEmbedContent } from '../courseTopic';
import { IUser } from '../user';

export interface ITopicVersion {
  id?: string;
  _id?: string;
  stage: 'pending' | 'accepted' | 'rejected';
  topicId: Schema.Types.ObjectId | string;
  creator: Schema.Types.ObjectId | string | IUser;
  version: {} & (
    | {
        type: 'free_source_content';
        data: IEmbedContent;
      }
    | {
        type: 'doc_content';
        data: IDocContent;
      }
  );
  createdAt?: Date | string;
  updatedAt?: Date | string;
  _v?: number;
}

export type ITopicVersionModel = Model<ITopicVersion, Record<string, unknown>>;
