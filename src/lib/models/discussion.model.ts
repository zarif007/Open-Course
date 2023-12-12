import { IDiscussion, IDiscussionModel } from '@/types/discussion';
import { Schema, model, models } from 'mongoose';

const DiscussionSchema = new Schema<IDiscussion, IDiscussionModel>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender is required'],
    },
    topicId: {
      type: Schema.Types.ObjectId,
      ref: 'CourseTopic',
      required: [true, 'Course Topic is required'],
    },
    version: {
      type: Number,
      required: [true, 'Version is required'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
    },
    parentId: {
      type: String,
      default: '',
    },
    replies: {
      type: [Schema.Types.ObjectId],
      ref: 'Discussion',
      default: [],
    },
    reactions: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Discussion =
  models.Discussion ||
  model<IDiscussion, IDiscussionModel>('Discussion', DiscussionSchema);

export default Discussion;
