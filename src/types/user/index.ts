import { Model } from "mongoose";

export interface IUser {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  password?: string;
  isEmailVerified?: boolean;
  image: string;
  role?: "super_admin" | "admin" | "user" | "pro_User";
  preferences?: string[];
  userName?: string;
  bio?: string;
  points?: number;
}

export type IUserModel = Model<IUser, Record<string, unknown>>;
