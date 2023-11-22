import { connectToDB } from "@/lib/connectToMongoose";
import Course from "@/lib/models/course.model";
import CourseTopic from "@/lib/models/courseTopic.model";
import User from "@/lib/models/user.model";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface PageParams {
  params: {
    slug: string;
  };
}

export const GET = async (
  req: NextRequest,
  { params }: PageParams
): Promise<NextResponse> => {
  const slug = params.slug;

  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized: Login required!!!",
      data: null,
    });
  }

  await connectToDB();

  const course = await Course.findOne({ slug })
    .populate({
      path: "topics",
      model: CourseTopic,
    })
    .populate({
      path: "creator",
      model: User,
      select: "name image userName",
    });

  return NextResponse.json({ status: 200, data: course });
};
