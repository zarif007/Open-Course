import { connectToDB } from "@/lib/connectToMongoose";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  connectToDB();

  const users = await User.find({});

  return NextResponse.json({ data: users });
};

export const POST = async (req: NextRequest) => {
  connectToDB();

  const payload = await req.json();

  const user = await User.findOneAndUpdate(
    payload,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return NextResponse.json({ data: user });
};
