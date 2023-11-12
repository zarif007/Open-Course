import { ICourseAsk, ICourseAskModel } from "@/types/courseAsk";
import { Schema, model, models } from "mongoose";

const CourseAskSchema = new Schema<ICourseAsk, ICourseAskModel>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: "CourseTopic",
      required: [true, "Course topic is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    question: {
      type: String,
      required: [true, "Question is required"],
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
  model<ICourseAsk, ICourseAskModel>("CourseAsk", CourseAskSchema);

export default CourseAsk;
