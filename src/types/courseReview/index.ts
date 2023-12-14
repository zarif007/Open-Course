import { Model } from 'mongoose';
import { ICourse } from '../course';
import { IUser } from '../user';

export interface ICourseReview {
  id?: string;
  _id?: string;
  courseId: string | ICourse;
  user: string | IUser;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
}

export type ICourseReviewModel = Model<ICourseReview, Record<string, unknown>>;
