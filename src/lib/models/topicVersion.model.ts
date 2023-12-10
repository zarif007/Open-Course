import { topicTypes } from '@/constants/courseTopics';
import { ITopicVersion, ITopicVersionModel } from '@/types/topicVersion';
import { Schema, model, models } from 'mongoose';

const TopicVersionSchema = new Schema<ITopicVersion, ITopicVersionModel>(
  {
    stage: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    topicId: {
      type: String,
      required: [true, 'Topic Id required'],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    version: {
      type: {
        type: String,
        enum: topicTypes,
        default: 'free_source_content',
      },
      data: { type: Schema.Types.Mixed, required: true },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const TopicVersion =
  models.TopicVersion ||
  model<ITopicVersion, ITopicVersionModel>('TopicVersion', TopicVersionSchema);

export default TopicVersion;
