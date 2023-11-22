import { connectToDB } from "@/lib/connectToMongoose";
import Activity from "@/lib/models/activity.mode";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: {
    user: string;
  };
}

export const GET = async (req: NextRequest, { params }: IParams) => {
  await connectToDB();
  const user = params.user;

  const activities = await Activity.find({ user });

  return NextResponse.json({ data: activities });
};
