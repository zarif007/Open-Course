import {
  coursePrivacy,
  courseStatuses,
  courseTypes,
  topicPrivacy,
} from '@/constants/course';
import { ICourse, ICourseModel } from '@/types/course';
import { Schema, model, models } from 'mongoose';

const CourseSchema = new Schema<ICourse, ICourseModel>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    type: {
      type: String,
      enum: courseTypes,
      default: 'gn',
    },
    version: {
      type: Number,
      default: 1,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    contributors: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    enrolledUsers: {
      type: [String],
      default: [],
    },
    categories: {
      type: [String],
      default: [],
    },
    levels: {
      type: [String],
      default: [],
    },
    languages: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
    },
    banner: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: courseStatuses,
      default: 'published',
    },
    topics: {
      type: [Schema.Types.ObjectId],
      ref: 'CourseTopic',
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    checkPoints: {
      type: [
        {
          topicID: Number,
          checkPointID: Number,
          name: String,
        },
      ],
      default: [],
    },
    coursePrivacy: {
      type: String,
      enum: coursePrivacy,
      default: 'public',
    },
    topicPrivacy: {
      type: String,
      enum: topicPrivacy,
      default: 'open',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// CourseSchema.pre('save', function (next) {
//   this.contributors = [this.creator];
//   next();
// });

const Course =
  models.Course || model<ICourse, ICourseModel>('Course', CourseSchema);

export default Course;
