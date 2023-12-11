import { topicTypes } from '@/constants/courseTopics';
import { ICourseTopic, ICourseTopicModel } from '@/types/courseTopic';
import { Schema, model, models } from 'mongoose';

const CourseTopicSchema = new Schema<ICourseTopic, ICourseTopicModel>(
  {
    topicID: {
      type: Number,
      required: [true, 'Topic ID is required'],
    },
    sortID: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },

    versions: [
      {
        type: {
          type: String,
          enum: topicTypes,
          default: 'free_source_content',
        },
        creator: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: [true, 'Author is required'],
        },
        data: { type: Schema.Types.Mixed, required: true },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const CourseTopic =
  models.CourseTopic ||
  model<ICourseTopic, ICourseTopicModel>('CourseTopic', CourseTopicSchema);

export default CourseTopic;
