import { IActivity, IActivityModel } from '@/types/actvity';
import { Schema, model, models } from 'mongoose';

const ActivitySchema = new Schema<IActivity, IActivityModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    link: {
      type: String,
      required: [true, 'Link is required'],
    },
    text: {
      type: String,
      required: [true, 'Text is required'],
    },
    type: {
      type: String,
      enum: ['commented', 'created', 'enrolled', 'completed'],
      required: [true, 'Type is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Activity =
  models.Activity ||
  model<IActivity, IActivityModel>('Activity', ActivitySchema);

export default Activity;
