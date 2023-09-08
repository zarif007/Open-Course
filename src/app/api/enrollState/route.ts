import { connectToDB } from "@/lib/connectToMongoose";
import { EnrollState } from "@/lib/models/enrollState.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  connectToDB();

  const user = req.nextUrl.searchParams.get("user");
  const course = req.nextUrl.searchParams.get("course");

  const enrollState = await EnrollState.find({ user, course }).populate(
    "currentTopic"
  );

  return NextResponse.json({ enrollState });
};
