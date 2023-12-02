import { connectToDB } from "@/lib/connectToMongoose";
import User from "@/lib/models/user.model";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized: Login required",
    });
  }

  await connectToDB();

  const users = await User.find({});

  return NextResponse.json({ data: users });
};

export const POST = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized: Login required",
    });
  }

  await connectToDB();

  const payload = await req.json();

  const user = await User.findOneAndUpdate({ email: payload.email }, payload, {
    new: true,
    upsert: true,
  });

  return NextResponse.json({ data: user });
};
