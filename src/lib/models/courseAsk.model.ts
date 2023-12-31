import { ICourseAsk, ICourseAskModel } from '@/types/courseAsk';
import { Schema, model, models } from 'mongoose';

const CourseAskSchema = new Schema<ICourseAsk, ICourseAskModel>(
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
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
    },
    question: {
      type: String,
      required: [true, 'Question is required'],
    },
    responses: {
      type: [Schema.Types.ObjectId],
      ref: 'AskResponse',
      default: [],
    },
    theAnswers: {
      type: [String],
      default: [],
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
    tags: {
      type: [String],
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

const CourseAsk =
  models.CourseAsk ||
  model<ICourseAsk, ICourseAskModel>('CourseAsk', CourseAskSchema);

export default CourseAsk;
