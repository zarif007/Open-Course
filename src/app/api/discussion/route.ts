import { connectToDB } from "@/lib/connectToMongoose";
import Discussion from "@/lib/models/discussion.model";
import User from "@/lib/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized: Login required",
    });
  }

  await connectToDB();

  const topicId = req.nextUrl.searchParams.get("topicId");
  const version = req.nextUrl.searchParams.get("version");

  const discussions = await Discussion.find({
    version: parseInt(version ?? ""),
    topicId,
  })
    .populate({
      path: "sender",
      model: User,
    })
    .sort({ createdAt: -1 });
  return NextResponse.json({ data: discussions });
};

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized: Login required",
    });
  }

  await connectToDB();

  const payload = await req.json();

  const discussion = await Discussion.create(payload);

  return NextResponse.json({ data: discussion });
};
