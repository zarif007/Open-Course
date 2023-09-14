import { IDiscuss, IDiscussModel } from "@/types/discuss";
import { Schema, model, models } from "mongoose";

const DiscussSchema = new Schema<IDiscuss, IDiscussModel>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender is required"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
    replies: {
      type: [Schema.Types.ObjectId],
      ref: "Discuss",
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

const Discuss =
  models.Discuss || model<IDiscuss, IDiscussModel>("Discuss", DiscussSchema);

export default Discuss;
