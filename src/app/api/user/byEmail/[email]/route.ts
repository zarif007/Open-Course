import { connectToDB } from "@/lib/connectToMongoose";
import { connectToRedis } from "@/lib/connectToRedis";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

interface PageParams {
  params: {
    email: string;
  };
}

export const GET = async (
  req: NextRequest,
  { params }: PageParams,
  res: NextResponse
) => {
  const email = params.email;
  // const redis = connectToRedis();

  // const userFromRedis = await redis.get(email);

  // if (userFromRedis) {
  //   return NextResponse.json({ data: userFromRedis });
  // }

  await connectToDB();

  const user = await User.findOne({ email });

  // redis.set(email, user);

  return NextResponse.json({ data: user });
};
