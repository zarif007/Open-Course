import { IUser, IUserModel } from "@/types/user";
import { Schema, model, models } from "mongoose";

export const UserSchema = new Schema<IUser, IUserModel>(
  {
    externalId: {
      type: String,
      required: [true, "Id is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
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
