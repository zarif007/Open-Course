import { IUser, IUserModel } from "@/types/user";
import createSlug from "@/utils/createSlug";
import { Schema, model, models } from "mongoose";

export const UserSchema = new Schema<IUser, IUserModel>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      default: "",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
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
    points: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.pre("save", function (next) {
  if (!this.isNew || !this.name) {
    return next();
  }

  const slug = createSlug(this.name);
  this.userName = slug;

  next();
});

const User = models.User ?? model<IUser, IUserModel>("User", UserSchema);
export default User;
