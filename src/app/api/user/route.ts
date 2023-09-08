import { connectToDB } from "@/lib/connectToMongoose";
import { User } from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  connectToDB();

  const users = await User.find({});

  return NextResponse.json({ users });
};
