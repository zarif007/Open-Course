import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { connectToDB } from "@/lib/connectToMongoose";
import Course from "@/lib/models/course.model";
import CourseTopic from "@/lib/models/courseTopic.model";
import User from "@/lib/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface PageParams {
  params: {
    slug: string;
  };
}

export const GET = async (req: NextRequest, { params }: PageParams) => {
  const slug = params.slug;

  connectToDB();

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

  return NextResponse.json({ data: course });
};
