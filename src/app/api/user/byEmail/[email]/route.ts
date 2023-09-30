import { connectToDB } from "@/lib/connectToMongoose";
import User from "@/lib/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

interface PageParams {
  params: {
    email: string;
  };
}

export const GET = async (
  req: NextApiRequest,
  { params }: PageParams,
  res: NextApiResponse
) => {
  const email = params.email;
  connectToDB();

  const user = await User.findOne({ email });

  return NextResponse.json({ data: user });
};
