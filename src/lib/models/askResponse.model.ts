import { IAskResponse, IAskResponseModel } from '@/types/courseAsk/response';
import { Schema, model, models } from 'mongoose';

const AskResponseSchema = new Schema<IAskResponse, IAskResponseModel>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: 'CourseTopic',
      required: [true, 'Course topic is required'],
    },
    version: {
      type: Number,
      required: [true, 'Version is required'],
    },
    answer: {
      type: String,
      required: [true, 'Title is required'],
    },
    upVote: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    downVote: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const AskResponse =
  models.AskResponse ||
  model<IAskResponse, IAskResponseModel>('AskResponse', AskResponseSchema);

export default AskResponse;
