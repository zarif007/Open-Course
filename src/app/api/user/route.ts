import { connectToDB } from "@/lib/connectToMongoose";
import User from "@/lib/models/user.model";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectToDB();

  const users = await User.find({});

  return NextResponse.json({ data: users });
};

export const POST = async (req: NextRequest) => {
  await connectToDB();

  const payload = await req.json();
  const isExists = await User.findOne({ email: payload.email });

  if (isExists) {
    return NextResponse.json({ data: null });
  }

  const user = await User.create(payload);

  return NextResponse.json({ data: user });
};
