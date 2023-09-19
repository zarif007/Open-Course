import { IDiscussion, IDiscussionModel } from "@/types/discussion";
import { Schema, model, models } from "mongoose";

const DiscussionSchema = new Schema<IDiscussion, IDiscussionModel>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender is required"],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: "CourseTopic",
      required: [true, "Course Topic is required"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
    replies: {
      type: [Schema.Types.ObjectId],
      ref: "Discussion",
      default: [],
    },
    reactions: {
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

const Discussion =
  models.Discussion ||
  model<IDiscussion, IDiscussionModel>("Discussion", DiscussionSchema);

export default Discussion;
