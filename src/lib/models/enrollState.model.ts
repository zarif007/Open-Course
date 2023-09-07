import { IEnrollState, IEnrollStateModel } from "@/types/enrollState";
import { Schema, model } from "mongoose";

const EnrollStateSchema = new Schema<IEnrollState, IEnrollStateModel>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "The course ID is required"],
    },
    user: {
      type: String,
      required: true,
    },
    currentTopic: {
      type: Schema.Types.ObjectId,
      ref: "CourseTopic",
    },
    finishedTopics: {
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

export const EnrollState = model<IEnrollState, IEnrollStateModel>(
  "EnrollState",
  EnrollStateSchema
);
