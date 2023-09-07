import { Model } from "mongoose";

interface VerificationStatus {
  status: string;
  attempts: number | null;
  strategy: string;
  expire_at: number | null;
}

interface LinkedAccount {
  id: string;
  type: string;
}

interface EmailAddress {
  id: string;
  object: string;
  reserved: boolean;
  linked_to: LinkedAccount[];
  verification: VerificationStatus;
  email_address: string;
}

interface UserAttributes {
  username: string | null;
  image_url: string;
  last_name: string | null;
  created_at: number;
  first_name: string;
  updated_at: number;
  external_id: string | null;
  email_addresses: EmailAddress[];
}

export interface IUser {
  id?: string;
  _id?: string;
  externalId: string;
  attributes: UserAttributes;
  role?: "super_admin" | "admin" | "user" | "pro_User";
  preferences?: string[];
  userName?: string;
  bio?: string;
}

export type IUserModel = Model<IUser, Record<string, unknown>>;
