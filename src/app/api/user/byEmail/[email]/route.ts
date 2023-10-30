import { connectToDB } from "@/lib/connectToMongoose";
import { connectToRedis } from "@/lib/connectToRedis";
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
  // const redis = connectToRedis();

  // const userFromRedis = await redis.get(email);

  // if (userFromRedis) {
  //   return NextResponse.json({ data: userFromRedis });
  // }

  connectToDB();

  const user = await User.findOne({ email });

  // redis.set(email, user);

  return NextResponse.json({ data: user });
};
