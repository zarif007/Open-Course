import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined.");

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null };

export const connectToDB = async () => {
  if (!cached.conn) cached.conn = await mongoose.connect(MONGODB_URI);

  return cached.conn;
};
