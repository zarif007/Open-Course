import { connectToDB } from "@/lib/connectToMongoose";
import Discussion from "@/lib/models/discussion.model";
import User from "@/lib/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  connectToDB();

  const topicId = req.nextUrl.searchParams.get("topicId");
  const courseId = req.nextUrl.searchParams.get("courseId");

  const discussions = await Discussion.find({
    course: courseId,
    topic: topicId,
  })
    .populate({
      path: "sender",
      model: User,
    })
    .sort({ updatedAt: -1 });

  return NextResponse.json({ data: discussions });
};

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  connectToDB();

  const payload = await req.json();

  const discussion = await Discussion.create(payload);

  return NextResponse.json({ data: discussion });
};
