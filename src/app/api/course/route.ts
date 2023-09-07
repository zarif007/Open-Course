import { connectToDB } from "@/lib/connectToMongoose";
import { Course } from "@/lib/models/course.model";
import { NextResponse } from "next/server";

export const GET = async (res: NextResponse) => {
  connectToDB();

  const courses = await Course.find({});

  return NextResponse.json({ courses });
};
