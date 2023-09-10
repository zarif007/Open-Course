import { connectToDB } from "@/lib/connectToMongoose";
import Course from "@/lib/models/course.model";
import CourseTopic from "@/lib/models/courseTopic.model";
import User from "@/lib/models/user.model";
import apiReqWrapper from "@/utils/apiReqWrapper";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

interface PageParams {
  params: {
    id: string;
  };
}

export const GET = async (
  req: NextApiRequest,
  { params }: PageParams,
  res: NextApiResponse
) => {
  const id = params.id;
  connectToDB();

  const course = await Course.findById(id)
    .populate({
      path: "topics",
      model: CourseTopic,
    })
    .populate({
      path: "creator",
      model: User,
    });

  return NextResponse.json({ data: course });
};
