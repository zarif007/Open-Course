import { connectToDB } from "@/lib/connectToMongoose";
import { Course } from "@/lib/models/course.model";
import { ICourse } from "@/types/course";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  connectToDB();

  const courses = await Course.find({}).populate("topics").populate("creator");

  return NextResponse.json({ data: courses });
};
