import { IUser, IUserModel } from "@/types/user";
import { Schema, model, models } from "mongoose";

export const UserSchema = new Schema<IUser, IUserModel>(
  {
    externalId: {
      type: String,
      required: [true, "External ID is required"],
    },
    attributes: {
      type: Object,
      default: {},
    },
    role: {
      type: String,
      default: "user",
    },
    preferences: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const User = models.User ?? model<IUser, IUserModel>("User", UserSchema);
export default User;
