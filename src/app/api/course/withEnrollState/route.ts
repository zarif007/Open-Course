import { connectToDB } from "@/lib/connectToMongoose";
import Course from "@/lib/models/course.model";
import CourseTopic from "@/lib/models/courseTopic.model";
import { EnrollState } from "@/lib/models/enrollState.model";
import User from "@/lib/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export const GET = async (req: NextRequest) => {
  connectToDB();
  const userEmail = req.nextUrl.searchParams.get("userEmail");
  const courseSlug = req.nextUrl.searchParams.get("courseSlug");

  if (!courseSlug) {
    return NextResponse.json({ course: null, enrollState: null });
  }

  let userId = null;

  if (userEmail) {
    const user = await User.findOne({ email: userEmail });
    userId = user?._id;
  }

  const course = await Course.findOne({ slug: courseSlug })
    .populate({
      path: "topics",
      model: CourseTopic,
      select:
        "versions.title versions.description versions.source versions.duration",
    })
    .populate({
      path: "creator",
      model: User,
      select: "name image userName",
    });
  // .populate({
  //   path: "course.reviews.user",
  //   mode: User,
  // });

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
