import { connectToDB } from "@/lib/connectToMongoose";
import CourseTopic from "@/lib/models/courseTopic.model";
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

  const topics = await CourseTopic.find({});

  return NextResponse.json({ topics });
};
