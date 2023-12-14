import { ICourseReview, ICourseReviewModel } from '@/types/courseReview';
import { Schema, model, models } from 'mongoose';

const CourseReviewSchema = new Schema<ICourseReview, ICourseReviewModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'course Id is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const CourseReview =
  models.CourseReview ||
  model<ICourseReview, ICourseReviewModel>('CourseReview', CourseReviewSchema);

export default CourseReview;
