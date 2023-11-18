import { connectToDB } from "@/lib/connectToMongoose";
import Course from "@/lib/models/course.model";
import CourseTopic from "@/lib/models/courseTopic.model";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

interface PageParams {
  params: {
    id: string;
  };
}

export const GET = async (req: NextRequest, { params }: PageParams) => {
  connectToDB();

  const courses = await Course.find({ creator: params.id })
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
    })
    .limit(10);

  return NextResponse.json({
    meta: {
      page: 1,
      limit: 10,
      total: 10,
    },
    data: courses,
  });
};
