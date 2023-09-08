import { connectToDB } from "@/lib/connectToMongoose";
import { CourseTopic } from "@/lib/models/courseTopic.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  connectToDB();

  const topics = await CourseTopic.find({});

  return NextResponse.json({ topics });
};
