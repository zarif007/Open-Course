import { connectToDB } from "@/lib/connectToMongoose";
import Course from "@/lib/models/course.model";
import CourseTopic from "@/lib/models/courseTopic.model";
import User from "@/lib/models/user.model";
import apiReqWrapper from "@/utils/apiReqWrapper";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

interface PageParams {
  params: {
    slug: string;
  };
}

export const GET = async (req: NextRequest, { params }: PageParams) => {
  const slug = params.slug;

  // const token = await getToken({ req });
  // if (!token) {
  //   return NextResponse.json({ status: 401, message: "Unauthorized" });
  // }

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
