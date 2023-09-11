import { connectToDB } from "@/lib/connectToMongoose";
import User from "@/lib/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

interface PageParams {
  params: {
    userName: string;
  };
}

export const GET = async (
  req: NextApiRequest,
  { params }: PageParams,
  res: NextApiResponse
) => {
  const userName = params.userName;
  connectToDB();

  const user = await User.findOne({ userName });

  return NextResponse.json({ data: user });
};
