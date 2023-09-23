import { connectToDB } from "@/lib/connectToMongoose";
import Course from "@/lib/models/course.model";
import CourseTopic from "@/lib/models/courseTopic.model";
import { EnrollState } from "@/lib/models/enrollState.model";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  connectToDB();
  const userId = req.nextUrl.searchParams.get("userId");
  const courseSlug = req.nextUrl.searchParams.get("courseSlug");

  if (!courseSlug) {
    return NextResponse.json({ course: null, enrollState: null });
  }

  const course = await Course.findOne({ slug: courseSlug })
    .populate({
      path: "topics",
      model: CourseTopic,
    })
    .populate({
      path: "creator",
      model: User,
    });

  let enrollState = null;
  if (userId) {
    enrollState = await EnrollState.findOne({
      user: userId,
      course,
    }).populate({
      path: "currentTopic",
      model: CourseTopic,
    });
  }

  return NextResponse.json({ course, enrollState });
};
